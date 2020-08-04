const express = require('express')
const router = express.Router()

router.get('/home', (req, res) => {
  res.render('admin_index')
})

module.exports = router