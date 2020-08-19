const connection = require('../db/connection')

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

module.exports = {
  getDataDashboardHome
}