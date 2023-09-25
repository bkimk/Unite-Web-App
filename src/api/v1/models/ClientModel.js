const pool = require('./utils/Connector')


// Query Functions

const createClient = async (name, email, password) => {
    const createClientQuery = `
        INSERT INTO users (name, email, password, created_at, updated_at) 
        VALUES (?, ?, ?, NOW(), NOW());
    `
    await pool.query(createClientQuery, [name, email, password])

    // Get ID of newly inserted user
    const lastInsertedIdQuery = `
        SELECT LAST_INSERT_ID() AS inserted_id;
    `
    const [result] = await pool.query(lastInsertedIdQuery)
    return { userData: result }
}


const clientExists = async (email, password, phonenumber) => {
    // Build the SQL query dynamically based on the provided fields
    const conditions = []
    const params = []
    let whereClause;
    if (phonenumber) {
        conditions.push('phonenumber = ?');
        params.push(phonenumber);
    }
    if (email) {
        conditions.push('email = ?');
        params.push(email);
    }
    if (password) {
        conditions.push('password = ?');
        params.push(password);
        // If email + password combo (login), query must check for email match AND password match
        whereClause = conditions.join(' AND ')
    } else {
        // If password not included (create client), query must check for email OR phonenumber existence
        whereClause = conditions.join(' OR ')
    }

    const clientExistsQuery = `
        SELECT id, name, phonenumber, email, password
        FROM users
        WHERE ${whereClause}
    `
    const [result] = await pool.query(clientExistsQuery, params)

    // User does not exist for given input, so return false
    if(result.length === 0)
        return { userExists: false }
    // User exists, so return true and the existing record
    return { userExists: true, userData: result }
}


const updateClient = async (userid, name, phonenumber, email, password, location) => {
    // Build the SQL query dynamically based on the provided fields
    const conditions = [];
    const params = [];
    if (name) {
        conditions.push('name = ?');
        params.push(name);
    }
    if (email) {
        conditions.push('email = ?');
        params.push(email);
    }
    if (phonenumber) {
        conditions.push('phonenumber = ?');
        params.push(phonenumber);
    }
    if (password) {
        conditions.push('password = ?');
        params.push(password);
    }
    // if (location) {
    //     conditions.push('location = ?');
    //     location.split(' ')
    //     params.push(location);
    // }
    conditions.push('updated_at = NOW()')


    const updateClientQuery = `UPDATE users SET ${conditions.join(', ')} WHERE id = ${userid}`;
    
    const [result] = await pool.query(updateClientQuery, params)

    return { userData: result }
}


const getClient = async (userid) => {
    const [result] = await pool.query(
        `SELECT name, email, phonenumber, location, created_at, updated_at
        FROM users
        WHERE id = ${userid};`
    )
    return { userData: result }
}


module.exports = {
    createClient,
    clientExists,
    updateClient,
    getClient
}
