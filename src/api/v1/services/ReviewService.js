const reviewModel = require('../models/ReviewModel')

// Dummy data
const review = {
    0: {
        id: "0",
        resourceid: "1234",
        userid: "5678",
        rating: "10",
        content: "test",
        created_at: "time"
    },
}

// temporary id counter
temp = 0

/**
* Create Resource Review
* @param {string} userid
* @param {string} resourceid 
* @param {string} rating
* @param {string} review
*/
// Write service functions here
const createResourceReview = (userid, resourceid, rating, review) => {

    // Manually adding new review
    review[temp] = {
        id: temp,
        resourceid: resourceid,
        userid: userid,
        rating: rating,
        content: review,
        created_at: "time"          // Get time later  
    }

    temp++          // Remove after sql queries are made

    const clientResponse = {
        data: {
            msg: "Create Resource Review successful",
            review: review[temp-1]
        },
        error: null
    }
    return {clientResponse}
}

/**
* Create Resource Review
* @param {string} resourceid
*/
// Write service functions here
const getResourceReviews = (resourceid) => {

    var arr = []
    // Iterating through all reviews and returning all reviews with same resourceid as what is given
    for (var i = 0; i < review.length; i++) { 
        if (review[i].resourceid == resourceid) {
            arr.push(bookmarkedservices[i].id)
        }
    }

    console.log(arr)        // Printing all review ids

    const clientResponse = {
        data: {
            review: {
                arr
            }
        },
        error: null
    }
    return {clientResponse}
}

module.exports = {
    createResourceReview,
    getResourceReviews
}