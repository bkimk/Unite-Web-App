// server.js

// IMPORTANT: to track timestamps, use this:
// https://mongoosejs.com/docs/timestamps.html

const express = require('express');
const Resource = require('../models/Resource')
const validate = require('../joiModels/resourcejoi')
const router = express.Router();


// Define your resource routes here

//create
router.post('/', async (req, res) => {
    // Route logic...
    try {
        //validate all the informations that were sent to this route
        const { error, value } = validate(req.body)
        if (error) {
            console.log(error.details.message)
            res.status(401).json({ msg: error.details.message })
        }
        console.log(value)
        //extract name, address, email from the request's body to query and check if the resource is already existed or not
        const { name, address, email } = req.body
        //check if the resource is already existed 
        let newResource = await Resource.findOne({ name, email, address })
        if (newResource) return res.status(400).json({ msg: 'Resource is already existed' })
        //if the resource is not existed, create a new resource
        newResource = new Resource({
            ...req.body
        })
        //save the created resource on the database
        newResource = await newResource.save()
        
        //send the response back to the client side with an 201 HTTP code and the created resource. 
        return res.status(201).json({ newResource })
    }
    catch (err) {
        console.log(err)
    }
});

// //retreive all resource on databases 
// router.get('/', async (req, res) => {
//     // Route logic...
//     const resources = await Resource.find()
//     res.json({ resources })
// });

//retreive resource with the given id
router.get('/:id', async (req, res) => {
    const resourceId = req.params.id
    const resource = await Resource.findById(resourceId)
    if (!resource) return res.status(404).json({ msg: 'Resource is not found' })
    return res.status(200).json({ resource })

})

//update
router.put('/:id', async (req, res) => {
    // Route logic...
    try {
        const resourceId = req.params.id
        const updatedField = req.body
        let updatedResource = await Resource.findByIdAndUpdate(resourceId, {
            $set: {
                ...updatedField
            }
        }, { new: true }) //try passing only updatedField in the second param
        if (!updatedResource) return res.status(404).json({ msg: "Resource is not found" })
        return res.status(200).json(updatedResource)
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
});


//delete
router.delete('/:id', async (req, res) => {
    // Route logic...
    try {
        const resourceId = req.params.id
        const deletedResource = await Resource.findByIdAndRemove(resourceId)
        if (!deletedResource) return res.status(404).json({ msg: 'Resource you want to delete is not found' })
        return res.status(200).json(deletedResource)

    }
    catch (err) {
        res.status(500).json({ msg: 'Internal server error' })
    }
});

//////////////////////////////////////////////////////////////////
///////////////////////// SEARCH BY NAME /////////////////////////
//////////////////////////////////////////////////////////////////

//this doesn't include any location data
router.get('/getResources/name', async (req, res) => {
    try {
        const { name, kindofresource } = req.query;


        // Now we get the resources
        const objs = await Resource.find({
            name: { $regex: '.*' + findname + '.*' },
            kindofresource: { $regex: '.*' + kindofresource + '.*' },
        });

        res.json(objs);
    } catch (error) {
        res.json({ message: "Internal Server Error" });
    }
});

//////////////////////////////////////////////////////////////////
///////////////////// SEARCH BY NAME AND NEARBY //////////////////
//////////////////////////////////////////////////////////////////

//this searches by name and users location
router.get('/getResources/namenearby', async (req, res) => {
    try {

        const { name, userLatitude, userLongitude, kindofresource, maxDistance } = req.query;


        //response validation
        if (maxDistance == null) {
            maxDistance = 500000;
        }
        if (maxDistance < 1) {
            maxDistance = 1;
        }
        if (maxDistance > 500000) {
            maxDistance = 500000;
        }

        //lastly, we need to search by the kind of resource

        //now we get the resources
        const objs = await Resource.find(
            {
                name: { $regex: '.*' + name + '.*' },
                kindofresource: { $regex: '.*' + kindofresource + '.*' },
                location:
                {
                    $near:
                    {
                        $geometry: {
                            type: "Point", coordinates: [userLongitude, userLatitude]
                            //the origin point.
                        },
                        //$minDistance: 0, //in meters
                        $maxDistance: maxDistance  //in meters
                    }
                }
            });
        res.json(objs);
    } catch (error) {
        //res.json({ error: 'Internal Server Error' });
        res.json({ message: "Internal Server Error" });
    }
});

// //////////////////////////////////////////////////////////////////
// ///////////////////////// SEARCH NEARBY //////////////////////////
// //////////////////////////////////////////////////////////////////

//this searches by location and type
//parameters: maxDistance, userLatitude, userLongitude, kindofresource

router.get('/getResources/location', async (req, res) => {
    const { maxDistance, userLatitude, userLongitude, kindofresource } = req.query;
    console.log(req.query);


    try {

        //the req.body will have both the location of the user and the max distance
        //response validation
        if (maxDistance == null) {
            maxDistance = 500000;
        }
        if (maxDistance < 1) {
            maxDistance = 1;
        }
        if (maxDistance > 500000) {
            maxDistance = 500000;
        }

        //now we get the resources
        const objs = await Resource.find(
            {
                kindofresource: { $regex: '.*' + kindofresource + '.*' } ,
                location:
                {
                    $near:
                    {
                        $geometry: {
                            type: "Point", coordinates: [userLongitude, userLatitude]
                            //the origin point.
                        },
                        $maxDistance: maxDistance  //in meters
                    }
                }
            });

        
            
        res.json(objs);
    } catch (error) {
        res.json({ message: "Internal Server Error", error: error });
    }
});

module.exports = router;