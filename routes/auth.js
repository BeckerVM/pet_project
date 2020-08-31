const express = require('express')
const router = express.Router()
const passport = require('passport')

const { noAuthenticated } = require('../helpers/auth')

//CONTROLADORES
const authController = require('../controllers/authentication_controller')

router.get('/login', noAuthenticated, authController.getLoginPage)


router.post(
  '/login', 
  passport.authenticate('local', { failureRedirect: '/auth/login' }), 
  authController.login
)

router.get('/logout', authController.logout)

router.get('/recovery', authController.sendEmail)

module.exports = router