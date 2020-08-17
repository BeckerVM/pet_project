const helpers = {
  isAuthenticatedAdmin: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next()
    }

    res.redirect('/auth/login')
  },
  noAuthenticated: (req, res, next) => {
    if(!req.isAuthenticated()) {
      return next()
    }
    res.redirect('/dashboard/home')
  }
}


module.exports = helpers