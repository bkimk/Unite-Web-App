const express = require('express');
const router = express.Router();
const clientCtrl = require("../controllers/ClientController")
const {authenticateJWT} = require('../middleware/JWT')

// Client Routes
router.post("/create",clientCtrl.createClient)
router.post("/login", clientCtrl.loginClient)
router.post("/update", authenticateJWT, clientCtrl.updateClient)
router.get("/get", authenticateJWT, clientCtrl.getClient)
router.get("/logout", authenticateJWT, clientCtrl.logoutClient)
router.post("/refresh-token", authenticateJWT, clientCtrl.refreshClientToken)
// router.post("/recover-password", clientCtrl.recoverClientPassword)


module.exports = router;