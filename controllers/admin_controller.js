const connection = require('../db/connection')
const cloudinary = require('cloudinary').v2
const fs = require('fs-extra')

cloudinary.config({ 
  cloud_name: 'dripm8g4s', 
  api_key: '537988747936494', 
  api_secret: 'eQn7ynR6lGimxTxBqU9qVB16FtM' 
})

const getDataDashboardHome = (req, res) => {

  const data = {}
  connection.query('SELECT * FROM mascotas where estado = ?', ['Libre'], (err, pets) => {
    if(err) throw err
    data.quantityPets = pets.length

    connection.query('SELECT * FROM trabajadores', (err, workers) => {
      if(err) throw err
      data.quantityWorkers = workers.length

      connection.query('SELECT * FROM postulaciones', (err, postulations) => {
        if(err) throw err
        data.quantityPostulations = postulations.length

        connection.query('SELECT * FROM adopciones', (err, adoptions) => {
          if(err) throw err
          data.quantityAdoptions = adoptions.length

          connection.query('SELECT * FROM amenidades where tipo = ?', ['Noticia'], (err, news) => {
            if(err) throw err
            data.quantityNews = news.length

            connection.query('SELECT * FROM amenidades where tipo = ?', ['Historia'], (err, stories) => {
              if(err) throw err
              data.quantityStories = stories.length

              res.render('admin_index', { data, url: 'INICIO' })
            })
          })
        })
      })
    })
  })
}

const addNewAmenidad = async (req, res) => {
  const { titulo, contenido, dia, mes, anio, tipo } = req.body
  const fecha = `${dia} ${mes} ${anio}`
  const resultc = await cloudinary.uploader.upload(req.file.path)

  connection.query(
    'INSERT INTO amenidades (nombre, tipo, fecha, contenido, url) VALUES (?, ?, ?, ?, ?)', 
    [titulo, tipo, fecha, contenido, resultc.url], 
    async (err, result) => {

    if(err) throw err;
      await fs.unlink(req.file.path)
      res.redirect('/dashboard/stories')
    })
}

module.exports = {
  getDataDashboardHome,
  addNewAmenidad
}