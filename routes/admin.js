const express = require('express')
const router = express.Router()

const { isAuthenticatedAdmin } = require('../helpers/auth')

router.get('/home', isAuthenticatedAdmin, (req, res) => {
  res.render('admin_index')
})

module.exports = router