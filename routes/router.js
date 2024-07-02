const express = require('express');
const userController = require('../controllers/userController')
const router = new express.Router();

//register
router.post('/register',userController.registerUser)

//login
router.post('/login',userController.loginUser)

module.exports = router