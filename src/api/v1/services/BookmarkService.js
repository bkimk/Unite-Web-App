// const { createJWT } = require('../helpers/JWTHelper')
const bookmarkModel = require('../models/BookmarkModel')

// Service Functions

/**
* Create Client Bookmark
* @param {string} userid 
* @param {string} resourceid
*/
const createClientBookmark = async (userid, resourceid) => {
    
    // Check to see if bookmark exists
    const bookmarkExistsResult = await bookmarkModel.bookmarkExists(userid, resourceid)
    if (bookmarkExistsResult.bookmarkExists) {
        throw new Error('Bookmark for User already exists.')
    }

    // If not exists, create bookmark
    await bookmarkModel.createClientBookmark(userid, resourceid)
    
    // Check to see if bookmark was added
    const successfullyCreated = await bookmarkModel.bookmarkExists(userid, resourceid)

    // If True, this means bookmark exists and was successfully added
    if (!successfullyCreated.bookmarkExists) {
        throw new Error('Bookmark for User could not be created')
    }

    const clientResponse = {
        data: {
            msg: "Resource successfully bookmarked"
        },
        error: null
    }
    return {clientResponse}
}

/**
* Get Client Bookmarks 
* @param {string} userid 
*/
const getClientBookmarks = async (userid) => {
    
    const getClientBookmark = await bookmarkModel.getClientBookmarks(userid)
    const clientResponse = {
        data: {
            userData: getClientBookmark
        },
        error: null
    }
    return {clientResponse}
}

/**
* Delete Client Bookmark (singular)
* @param {string} userid
* @param {string} resourceid
*/
const deleteClientBookmark = async (userid, resourceid) => {

    console.log(userid, resourceid)
    // Check to see if bookmark exists
    const bookmarkExistsResult = await bookmarkModel.bookmarkExists(userid, resourceid)
    if (!bookmarkExistsResult.bookmarkExists) {
        throw new Error('Bookmark does not exist.')
    }

    // Delete bookmark
    await bookmarkModel.deleteClientBookmark(userid, resourceid)

    // Check to see if bookmark exists; successful if does not exist
    const bookmarkDeleteResult = await bookmarkModel.bookmarkExists(userid, resourceid)
    if (bookmarkDeleteResult.bookmarkExists) {
        throw new Error('Bookmark was not deleted.')
    }

    const clientResponse = {
        data: {
            msg: "Deleted Client Bookmark Successful"
        },
        error: null
    }
    return clientResponse

}
module.exports = {
    createClientBookmark,
    getClientBookmarks,
    deleteClientBookmark
}