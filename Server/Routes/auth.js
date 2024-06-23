const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");



router.post('/verify',authController.verifyUser)


module.exports = router