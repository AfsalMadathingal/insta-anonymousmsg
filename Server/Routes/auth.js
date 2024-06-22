const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");



router.get('/verify',authController.verifyUser)


module.exports = router