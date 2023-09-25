const pool = require('./utils/Connector')

// Query Functions

/**
* Checking if Bookmark Exists
* @param {string} userid 
* @param {string} resourceid
*/
const bookmarkExists = async (userid, resourceid) => {
    const insertClientQuery = `
        SELECT *
        FROM bookmarkedservices b
        WHERE b.userid = ? AND b.resourceid = ?;
    `
    const [result] = await pool.query(insertClientQuery, [userid, resourceid])

    console.log('result', result)

    // bookmark does not exist for given input, so return false
    if(result.length === 0) return { bookmarkExists: false }
    // bookmark exists, so return true and the existing record
    return { bookmarkExists: true }
}


/**
* Get Client Bookmarks
* @param {string} userid 
* @param {string} resourceid
*/
const createClientBookmark = async (userid, resourceid) => {
    // inserts new data point with resourceid and userid into bookmarkedservices table

    console.log('userid', userid)
    console.log('resourceid', resourceid)
    const insertClientQuery = `
        INSERT INTO bookmarkedservices (resourceId, userId) 
        VALUES (?, ?);
    `;

    // Properly bind the values to the placeholders using an array
    await pool.query(insertClientQuery, [resourceid, userid]);
};

/**
* Get Client Bookmarks 
* @param {string} userid 
*/
const getClientBookmarks = async (userid) => {
    // returns 
    const insertClientQuery = `
        SELECT DISTINCT r.id, r.name, r.kindofresource, r.email, r.address, r.description, r.location, r.phonenumber, r.website, r.rating
        FROM bookmarkedservices b NATURAL JOIN resource r
        WHERE b.userid = 1;
    `   
    const [result] = await pool.query(insertClientQuery, [userid])
    return result
}

/**
* Delete Client Bookmark
* @param {string} userid
* @param {string} resourceid
*/
const deleteClientBookmark = async (userid, resourceid) => {
    console.log("model ", userid, resourceid)
    const insertClientQuery = `
        DELETE FROM bookmarkedservices b 
        WHERE b.userId = ? AND b.resourceId = ?;
    `   
    await pool.query(insertClientQuery, [userid, resourceid])


}
module.exports = {
    bookmarkExists,
    createClientBookmark,
    getClientBookmarks,
    deleteClientBookmark
}

/*// Created query to return all resourceIds not bookmarked by user
// Input(s): userId

connection.query("SELECT b.resourceId FROM bookmarkedservices b EXCEPT SELECT b1.resourceId FROM bookmarkedservices b1 WHERE b1.userId = userId")
*/