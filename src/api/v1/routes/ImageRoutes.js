const express = require('express');
const router = express.Router();
const imageCtrl = require("../controllers/ImageController")
const {authenticateJWT} = require("../middleware/JWT");

// Image Routes
// Client
router.post("/createClientImage", authenticateJWT, imageCtrl.createClientImage)
router.get("/getClientImage", authenticateJWT, imageCtrl.getClientImage)
router.put("/updateClientImage", authenticateJWT, imageCtrl.updateClientImage)
// Resource
router.post("/createResourceImage",imageCtrl.createResourceImage)
router.get("/getResourceImage", imageCtrl.getResourceImage)
router.delete("/deleteResourceImage/:resourceImage_id",imageCtrl.deleteResourceImage)


module.exports = router;