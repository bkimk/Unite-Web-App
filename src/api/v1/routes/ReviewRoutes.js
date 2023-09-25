const express = require('express');
const router = express.Router();
const reviewModel = require('../models/ReviewModel')
const reviewCtrl = require("../controllers/ReviewController")
const {authenticateJWT} = require('../middleware/JWT')

// Review Routes
router.post("/create", authenticateJWT, reviewCtrl.createResourceReview)
router.get("/get", reviewCtrl.getResourceReviews)

module.exports = router;