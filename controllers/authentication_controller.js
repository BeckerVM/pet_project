const passport = require('passport')
const connection = require('../db/connection')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const getLoginPage = (req, res) => {
  res.render('login')
}

const getRecoveryPage = (req, res) => {
  res.render('recovery')
}

const login = (req, res) => {
  res.redirect('/dashboard/home')
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/auth/login')
}

const getPageAccountAdmin = (req, res) => {
  res.render('admin_account', { url: 'CONFIGURACION' })
}

const updateAccount = (req, res) => {
  const { username, pass, email, npass } = req.body

  if(username !== '' && pass !== '' && email !== '' && npass !== '') {
    connection.query(
      'SELECT * FROM administradores',
      (err, admins) => {
        if(err) throw err
        if(bcrypt.compareSync(pass, admins[0].contrasena)) {
          
          const hash = bcrypt.hashSync(npass, 10)
          connection.query(
            'UPDATE administradores SET usuario = ?, contrasena = ?, email = ?, pass = ? WHERE id = ?',
            [username, hash, email, npass, 1], 
            (err, result) => {
              if(err) throw err
              req.logout()
              res.json({ success: true })
            }
          )
        } else {
          res.status(400).json({ message: 'Ingrese correctamente la contraseña actual para continuar con la actualización de datos' })
        }
      }
    )
  } else {
    res.status(400).json({
      message: 'Por favor rellene todos los campos para continuar con la actualización de datos'
    })
  }
}

const sendEmail = (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'beiker2203@gmail.com',
      pass: 'masamune22'
    }
  })

  connection.query(
    'SELECT * FROM administradores',
    (err, admins) => {
      if(err) throw err

      let email = admins[0].email
      let mailOption = {
        from: "beiker2203@gmail.com",
        to: email,
        subject: 'Recuperacion de cuenta',
        text: `Tu nombre de usuario es: ${admins[0].usuario} y tu contraseña: ${admins[0].pass}`
      }

      transporter.sendMail(mailOption, (err, info) => {
        if(err) {
          console.log(err)
        } else {
          console.log('Email Enviado')
          res.redirect('/auth/recovery/account')
        }
      })
    }
  )
}

module.exports = {
  getLoginPage,
  login,
  logout,
  getPageAccountAdmin,
  updateAccount,
  sendEmail,
  getRecoveryPage
}