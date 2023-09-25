const resourceModel = require('../models/ResourceModel')


/**
 * createResource: creates a new resoure for a client
 */
const createResource = async (userid, name, kindofresource, email, address, description, location, phonenumber, website, hours) => {

    // Use model to create client entry in database
    await resourceModel.createResource(userid, name, kindofresource, email, address, description, location, phonenumber, website, hours)

    
    const clientResourceResponse = {
        data: {
            msg: "Client Resource creation successful",
            resource: {
                name: name,
                kindofresource: kindofresource,
                email: email,
                address: address,
                description: description,
                location: location,
                phonenumber, phonenumber,
                website: website,
                hours: hours
            }
        },
        error: null
    }
    return clientResourceResponse
}


/**
 * getResource: gets resource Id

 */
const getResourceByID = async (resourceId) => {    
    const getResourceByIDResult = await resourceModel.getResourceByID(resourceId)
    
    const resourceResponse = {
        data: {
            msg: "Get Resource ID Success",
            resource: getResourceByIDResult
        },         
        error: null
    }

    return resourceResponse
}


/**
 * getresource: gets resource Name
 * TO DO, NOT FINISHED
 */
const getResourceByName = (name) => {
    // resourceModel.get
    
    const resourceResponse = {
        data: toreturn,
        error: null
    }

    return resourceResponse
}

/**
 * getResource: gets resource Id

 */
const getResourceByKind = async (kindOfResource) => {    
    const getResourceByKindResult = await resourceModel.getResourceByKind(kindOfResource)
    const resourceResponse = {
        data: {
            msg: "Get Resource ID Success",
            resources: getResourceByKindResult
        },         
        error: null
    }

    return resourceResponse
}

/**
 * getresource: gets resource NearBy
 */
const getResourcesNearby = (latitude,longitude, maxDistance) => {
    // call sql here

    // const existingResource = resources[idcounter] // match the distance
    const resourceResponse = {
        data: {
            msg: "200OK Get resource successful",
            // resource: existingResource,
        },
        error: null
    }

    return resourceResponse
}


/**
 * updateResource: update based on resource id
 */
const updateResource = async (userid, resourceid, name, kindofresource, email, address, description, location, phonenumber, website, rating, hours) => {
    await resourceModel.updateResource(userid, resourceid, name, kindofresource, email, address, description, location, phonenumber, website, rating, hours)

    const resourceResponse = {
        data: {
            msg: "Resource update successful"
        },
        error: null
    }
    return resourceResponse
}


/**
 * deleteResource: delete resource based on resource id
 */
const deleteResource = async (resourceid) => {
    await resourceModel.deleteResource(resourceid)

    const resourceResponse = {
        data: {
            msg: 'Resource deleted successfully'
        },
        error: null
    }
    return resourceResponse
}




module.exports = {
    createResource,
    getResourceByID,
    getResourceByName,
    getResourceByKind,
    getResourcesNearby,
    updateResource,
    deleteResource
}
