const connection = require('../db/connection')
const cloudinary = require('cloudinary').v2
const fs = require('fs-extra')

cloudinary.config({ 
  cloud_name: 'dripm8g4s', 
  api_key: '537988747936494', 
  api_secret: 'eQn7ynR6lGimxTxBqU9qVB16FtM' 
})

const sendDonation = async (req, res) => {
  const { nombre, direccion, celular, email, dni } = req.body
  const resultc = await cloudinary.uploader.upload(req.file.path)

  connection.query('SELECT * FROM donantes WHERE dni = ?', [dni], (err, donantes) =>  {
    if(err) throw err;

    if(donantes.length === 0) {
      connection.query(
        'INSERT INTO donantes (dni, nombrecompleto, direccion, celular, email) VALUES (?, ?, ?, ?, ?)',
        [dni, nombre, direccion, celular, email],
        (err, result) => {
          if (err) throw err;

          connection.query(
            'INSERT INTO donaciones(dnidonante, fecha, url) VALUES (?, ?, ?)',
            [dni, new Date().toLocaleDateString("en-US"), resultc.url],
            async (err, result) => {
              if (err) throw err;
              await fs.unlink(req.file.path)
              res.redirect('/agradecimientos')
            }
          )
        }
      )
    } else {
      connection.query(
        'INSERT INTO donaciones(dnidonante, fecha, url) VALUES (?, ?, ?)',
        [dni, new Date().toLocaleDateString("en-US"), resultc.url],
        async (err, result) => {
          if (err) throw err;
          await fs.unlink(req.file.path)
          res.redirect('/agradecimientos')
        }
      )
    }
    
  })
}

const getPageAdminDonation = (req, res) => {
  res.render('admin_donations', { url: 'DONACIONES' })
}

const getDonations = (req, res) => {
  connection.query(
    'SELECT id, nombrecompleto as donante, celular, email, fecha, url from donantes INNER JOIN donaciones ON dnidonante = dni',
    (err, donations) => {
      if(err) throw err;
      
      res.json({
        donations
      })
    }
  )
}

module.exports = {
  sendDonation,
  getDonations,
  getPageAdminDonation
}