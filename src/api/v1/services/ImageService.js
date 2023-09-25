const imageModel = require('../models/ImageModel')
const {createJWT} = require('../helpers/JWTHelper')
const {pool} = require("../models/utils/Connector");


// Write service functions here
/**
 * createClientImage: creates a new image for a client
 */
const createClientImage = async (client_id, image_url) => {

    // Use model to create image entry in database
    const createClientImageResult = await imageModel.insertClientImage(client_id, image_url)

    console.log(createClientImageResult)
    const clientImageResponse = {
        data: {
            msg: "Client image creation successful",
            clientImage: {
                userId: client_id,
                path: image_url,
            }
        },
        error: null,
    }
    return {clientImageResponse}
}

/**
 * getClientImage: gets an image for a client
 */
const getClientImage = async (client_id) => {

    // Use model to get image entry in database
    const getClientImageResult = await imageModel.getClientImage(client_id)


    const clientImageResponse = {
        data: {
            msg: "Client image retrieval successful",
            clientImage: {
                userId: client_id,
                path: getClientImageResult.clientImage.path,

            },
        },
        error: null,
    }
    return {clientImageResponse}
}
const updateClientImage = async (client_id, image_url) => {
    try {

        // Use model to update image entry in database
        const updateClientImageResult = await imageModel.updateClientImage(client_id, image_url);

        const clientImageResponse = {
            data: {
                msg: 'Client image update successful',
                clientImage: {
                    userId: client_id,
                    path: image_url,
                }

            },
            error: null
        };
        return clientImageResponse;
    } catch (error) {
        const clientImageResponse = {
            data: null,
            error: error.message || 'An error occurred during image update'
        };
        return clientImageResponse;
    }
}

const getResourceImage = async (resource_id) => {
    // Use model to get image entry in database (using dummy data for now)
    const resourceImageResponse = {
        data: {
            msg: "Resource image retrieval successful",
            resourceImage: resourceImages[0].image_url,
        },
        error: null,
    }
    return {resourceImageResponse}
}

let ridcounter = 1
const createResourceImage = async (resource_id, image_url) => {
    // Use model to create image entry in database (using dummy data for now)
    console.log("before", resourceImages)
    resourceImages[ridcounter] = {
        id: ridcounter,
        resource_id: resource_id,
        image_url: image_url,
    }
    ridcounter++     // remove when using sql
    console.log("after", resourceImages)

    const resourceImageResponse = {
        data: {
            msg: "Resource image creation successful"
        },
        error: null,
    }
    return {resourceImageResponse}
}

const deleteResourceImage = async (resourceImage_id) => {

    try {
        console.log('before delete', resourceImages)
        // Find the index of the image with the specified resourceImage_id
        const resourceImageIndex = resourceImages.findIndex(image => image.resourceImage_id === resourceImage_id);

        if (resourceImageIndex !== -1) {
            // Remove the image from the resourceImages array
            resourceImages.splice(resourceImageIndex, 1);
        } else {
            throw new Error('Image not found');
        }

        console.log('after delete', resourceImages)
        return {
            data: {
                msg: 'Resource image deleted successfully'
            },
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: 'An error occurred while deleting resource image: ' + error.message
        };
    }


}

module.exports = {
    createClientImage,
    getClientImage,
    getResourceImage,
    updateClientImage,
    createResourceImage,
    deleteResourceImage,
}