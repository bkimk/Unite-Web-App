//this will be a post request to add an audit log so as to help with security and debugging

const express = require('express');
const router = express.Router();

// Define your resource routes here

//create
router.post('/audit-log', async (req, res) => {
    // Route logic...
    res.json({ data: 'dummy data' })
});

//as time goes on, we'll impliment various checks and functions to handle different user events
//for instance limiting the login attempts in a certain time period, or checking for suspicious activity


module.exports = router;