const express = require('express');
const router = express.Router();

//this has two sections: updating the ratings on the resource, and posting reviews

router.post('/review-resource', async (req, res) => {
    
    //here a user rates a resource, so submit their rating to the database

    //afterwards, recalculate the ratings
    recalculateRatings();

});

//this is the edit review route, and should run the update function
router.put('/edit-review', async (req, res) => {

    //here a user edits their review, so submit their rating to the database

    //afterwards, recalculate the ratings
    recalculateRatings();

});


function recalculateRatings() {
    //this function will recalculate the ratings of a resource

    //first, get the ratings of the resource using '/get-ratings'

    //then count them
    //if there are no ratings for that score, return 0
    let onestar = 0;
    let twostar = 0;
    let threestar = 0;
    let fourstar = 0;
    let fivestar = 0;

    //then, get the average of the 
    
    let rating = onestar + twostar * 2 + threestar * 3 + fourstar * 4 + fivestar * 5;

    //then, update the resource with the new rating

}

router.get('/get-ratings/:id', async (req, res)=>{
    //here we get the ratings of a resource and output them in an array

    //using the /get-rating-value path, get the rating for the associated 1-5 star ratings and output them

    let onestar = [];
    let twostar = [];
    let threestar = [];
    let fourstar = [];
    let fivestar = [];

    
    return [];

});

router.put('/get-rating-value/:id', async (req, res)=>{
    //from the req, draw an in value
    
    //and the resource id

    //check if it's 1-5

    //if not, return an empty

    //otherwise, gather all values of that value

});

router.delete('/delete-rating/:id', async (req, res)=>{

    //if someone wants to delete their rating, they can do so through this route

    //afterwards, recalculate the ratings
    recalculateRatings();
    
});

module.exports = router;
