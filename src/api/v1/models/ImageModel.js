const pool = require('./utils/Connector')


// Query Functions

const insertClientImage = async (client_id, image_url) => {
    try {
        const query = 'INSERT INTO userImages (userId, path) VALUES (?, ?)';
        const values = [client_id, image_url];
        const [result] = await pool.query(query, values);
        return result.insertId; // Return the ID of the newly inserted image
    } catch (error) {
        throw error;
    }
}

const getClientImage = async (client_id) => {
    try {
        const query = 'SELECT * FROM userImages WHERE userId = ? LIMIT 1';
        const [result] = await pool.query(query, [client_id]);
        return { clientImage: result[0] };
    } catch (error) {
        throw error;
    }

}

const updateClientImage = async (client_id, image_url) => {
    try {
        const query = 'UPDATE userImages SET path = ? WHERE userId = ?';
        const values = [image_url, client_id];
        const [result] = await pool.query(query, values);
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    insertClientImage,
    getClientImage,
    updateClientImage

}