const pool = require('./utils/Connector')

/**
 *  createResource
 *  NOTES:
 *      - Need to check if resource exists already?
 *      - Add location in future once we figure that out
 */
const createResource = async (userid, name, kindofresource, email, address, description, location, phonenumber, website, hours) => {
    const createResourceQuery = `
        INSERT INTO resource (name, kindofresource, email, address, description, phonenumber, website, rating, publishedby, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `
    
    const createHoursQuery = `
        INSERT INTO hours (resourceId, day, open_time, close_time)
        VALUES (?, ?, ?, ?);
    `

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Insert into the resource table
    const [insertResourceResult] = await pool.query(createResourceQuery, [name, kindofresource, email, address, description, phonenumber, website, 0, userid]);
    console.log('insert resource result', insertResourceResult)
    resourceId = insertResourceResult.insertId;

    // Insert into the hours table for each day
    for (const [dayIndex, day] of days.entries()) {
        // console.log(dayIndex, day)
        const dayData = hours[dayIndex + 1];
        if (dayData) {
          const [createHoursResult] = await pool.query(createHoursQuery, [resourceId, dayIndex, dayData.opentime, dayData.closetime]);
          console.log(createHoursResult)
        }
    }

    return { resourceId };
    // Think about doing a rollback on createResouceQuery if createHours queries fail?
}


/**
 *  getResourceByID
 */
const getResourceByID = async (resourceId) => {
    const getResourceAndHoursQuery = `
        SELECT r.*, h.day, h.open_time, h.close_time
        FROM resource r
        LEFT JOIN hours h ON r.id = h.resourceId
        WHERE r.id = ?;
    `;

    const [results] = await pool.query(getResourceAndHoursQuery, [resourceId]);

    if (results.length === 0) {
        throw new Error('Resource not found for given ID');
    }

    const resource = {
        id: results[0].id,
        name: results[0].name,
        kindOfResource: results[0].kindofresource,
        email: results[0].email,
        address: results[0].address,
        description: results[0].description,
        location: results[0].location,
        phoneNumber: results[0].phonenumber,
        website: results[0].website,
        rating: results[0].rating,
        publishedBy: results[0].publishedby,
        created_at: results[0].created_at,
        updated_at: results[0].updated_at,
        hours: {}
    };

    results.forEach((row) => {
        if (row.day !== null) {
            resource.hours[row.day + 1] = {
                day: row.day,
                open_time: row.open_time,
                close_time: row.close_time
            };
        }
    });

    return resource;
}


/**
 *  getResourceByName
 *  TO DO LATER, NOT FINISHED
 */
const getResourceByName = async (name) => {
    const getResourceQuery = `
        SELECT *
        FROM resource
        WHERE name = ?;
    `;

    const getHoursQuery = `
        SELECT day, open_time, close_time
        FROM hours
        WHERE resourceId = ?;
    `;

    // Read from resource data from resource table
    const [resourceResult] = await pool.query(getResourceQuery, [name]);

    if (resourceResult.length === 0) {
        throw new Error('Resource not found for given name')
    }

    // Read hours for given resource id from hours table
    const [hoursResult] = await pool.query(getHoursQuery, [resourceResult[0].id]);

    const resource = {
        ...resourceResult[0],
        hours: hoursResult
    };

    return resource
}

/**
 *  getResourceByKind
 */
const getResourceByKind = async (kindOfResource) => {
    const getResourcesQuery = `
        SELECT r.*, h.day, h.open_time, h.close_time
        FROM resource r
        LEFT JOIN hours h ON r.id = h.resourceId
        WHERE r.kindofresource = ?;
    `;

    const [results] = await pool.query(getResourcesQuery, [kindOfResource]);

    const resources = [];

    results.forEach((row) => {
        const resourceId = row.id;

        // Find existing resource with the same ID in the array
        const existingResource = resources.find((resource) => resource.id === resourceId);

        if (!existingResource) {
            const resource = {
                id: row.id,
                name: row.name,
                kindOfResource: row.kindofresource,
                email: row.email,
                address: row.address,
                description: row.description,
                location: row.location,
                phoneNumber: row.phonenumber,
                website: row.website,
                rating: row.rating,
                publishedBy: row.publishedby,
                created_at: row.created_at,
                updated_at: row.updated_at,
                hours: {}
            };

            if (row.day !== null) {
                resource.hours[row.day + 1] = {
                    day: row.day,
                    open_time: row.open_time,
                    close_time: row.close_time
                };
            }

            resources.push(resource);
        } else {
            if (row.day !== null) {
                existingResource.hours[row.day + 1] = {
                    day: row.day,
                    open_time: row.open_time,
                    close_time: row.close_time
                };
            }
        }
    });

    return resources;
}

/**
 *  getResourceByDistance
 *  TO DO: second release
 */
const getResourceByDistance = () => {

}


/**
 *  updateResource
 *  Notes:
 *      - Consider doing rollback if one query fails in the middle
 *      - Add location in future once we figure that out
 */
const updateResource = async (userid, resourceid, name, kindofresource, email, address, description, location, phonenumber, website, rating, hours) => {
    // Add location later
    const updateResourceQuery = `
        UPDATE resource
        SET name = ?, kindofresource = ?, email = ?, address = ?, description = ?, phonenumber = ?, website = ?, rating = ?, updated_at = NOW()
        WHERE id = ? AND publishedby = ?;
    `;

    const deleteHoursQuery = `
        DELETE FROM hours
        WHERE resourceId = ?;
    `;

    const createHoursQuery = `
        INSERT INTO hours (resourceId, day, open_time, close_time)
        VALUES (?, ?, ?, ?);
    `;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Update the resource table
    const [updateResourceResult] = await pool.query(updateResourceQuery, [name, kindofresource, email, address, description, phonenumber, website, rating, resourceid, userid]);

    if (updateResourceResult.affectedRows === 0) {
        throw new Error('Resource not found or user not authorized')
    }

    // Delete existing hours data
    await pool.query(deleteHoursQuery, [resourceid]);

    // Insert new hours data
    console.log(hours)
    for (const [dayIndex, day] of days.entries()) {
        const dayData = hours[dayIndex + 1];
        if (dayData) {
            await pool.query(createHoursQuery, [resourceid, dayIndex + 1, dayData.opentime, dayData.closetime]);
        }
    }

    // Think about doing a rollback on createResouceQuery if createHours queries fail?
    return resourceid
}


/**
 *  deleteResource
 */
const deleteResource = async (resourceid) => {
    const deleteQuery = `
        DELETE FROM resource
        WHERE id = ?;
    `;

    const [result] = await pool.query(deleteQuery, [resourceid]);
    if(result.affectedRows > 0)
        return
    throw new Error('Resource was not deleted')
}



module.exports = {
    createResource,
    getResourceByID,
    getResourceByName,
    getResourceByKind,
    updateResource,
    deleteResource
};