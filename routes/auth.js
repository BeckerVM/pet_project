const express = require('express')
const router = express.Router()

//CONTROLADORES
const authController = require('../controllers/authentication_controller')

router.get('/login', authController.getLoginPage)

module.exports = router