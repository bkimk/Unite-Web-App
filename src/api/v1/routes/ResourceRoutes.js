const express = require('express');
const router = express.Router();
const resourceModel = require('../models/ResourceModel')
const resourceCtrl = require("../controllers/ResourceController")
const {authenticateJWT} = require('../middleware/JWT')
// Resource Routes
router.post("/create", authenticateJWT, resourceCtrl.createResource)
router.get("/get/id",resourceCtrl.getResourceByID)
router.get("/get/name",resourceCtrl.getResourceByName)
router.get("/get/kind",resourceCtrl.getResourceByKind)
router.get("/get/location",resourceCtrl.getResourceNB)
router.put("/update", authenticateJWT, resourceCtrl.updateResource)
router.delete("/delete",authenticateJWT,resourceCtrl.deleteResource)


module.exports = router;
