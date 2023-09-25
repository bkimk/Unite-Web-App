const express = require('express');
const { pool } = require('../models/Connector')
const router = express.Router();


router.get('/get-users' , async (req,res)=>{
    let sql = 'SELECT * FROM users';
    
    pool.query(sql, (err, result) => {
        if(err) throw err;
        // console.log(result);
        res.json({result});
    });
});

module.exports = router;
