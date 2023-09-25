const express = require('express');
const router = express.Router();
const bookmarkCtrl = require("../controllers/BookmarkController")
const {authenticateJWT} = require('../middleware/JWT')

// Bookmark Routes; authenticateJWT done for all to verify user actions
router.post("/create", authenticateJWT, bookmarkCtrl.createClientBookmark)
router.get("/get", authenticateJWT, bookmarkCtrl.getClientBookmarks)
router.delete("/delete", authenticateJWT, bookmarkCtrl.deleteClientBookmark)

module.exports = router;