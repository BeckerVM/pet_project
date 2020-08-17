const passport = require('passport')

const getLoginPage = (req, res) => {
  res.render('login')
}

const login = (req, res) => {
  res.redirect('/dashboard/home')
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/auth/login')
}

module.exports = {
  getLoginPage,
  login,
  logout
}