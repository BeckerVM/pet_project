const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const connection = require('../db/connection')

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    console.log('HOLIS')
    connection.query('SELECT * FROM administradores WHERE usuario = ?', [username], (err, user) => {
      
      if(user.length === 0) {
        return done(null, false, { message: 'Usuario o Contraseña Incorrecta' })
      }

      if(password === user[0].contrasena) {
        console.log('comparando contraseña')
        return done(null, user[0])
      } else {
        return done(null, false, { message: 'Usuario o Contraseña Incorrecta' })
      }
    })
  }
))


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  connection.query('SELECT * FROM administradores WHERE id = ?', [id], (err, user) => {
    done(err, user[0])
  })
})