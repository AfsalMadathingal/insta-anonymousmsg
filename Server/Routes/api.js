const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");



router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/logout',userController.logout)
router.post('/sendMessage/:id',userController.sendMessage)
router.get('/finduser/:id',userController.findUser)


module.exports = router