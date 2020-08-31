const connection = require('../db/connection')

const getDataHome = (req, res) => {
  
  connection.query('SELECT * FROM mascotas WHERE estado = ? LIMIT 4', ['Libre'], (err, pets) => {
    if(err) throw err;

    connection.query('SELECT * FROM amenidades where tipo = ? LIMIT 3', ['Noticia'], (err, news) => {
      if(err) throw err;

      connection.query('SELECT * FROM amenidades where tipo = ? LIMIT 4', ['Historia'], (err, stories) => {
        if(err) throw err;
        
        res.render('index', { pets, news, stories })
      })
      
    })
  
  })
}

const getHistory = (req, res) => {
  const { historyId } = req.params

  connection.query('SELECT * FROM amenidades where id = ?', [historyId], (err, history) => {
    if(err) throw err

    res.render('history', { history: history[0] })
  })
}

const getNew = (req, res) => {
  const { newId } = req.params

  connection.query('SELECT * FROM amenidades where id = ?', [newId], (err, newp) => {
    if(err) throw err

    res.render('new', { new: newp[0] })
  })
  
}


const getNews = (req, res) => {
  connection.query('SELECT * FROM amenidades where tipo = ?', ['Noticia'], (err, news) => {
    if(err) throw err

    res.render('news', { news })
  })

}

const getStories = (req, res) => {
  connection.query('SELECT * FROM amenidades where tipo = ?', ['Historia'], (err, stories) => {
    if(err) throw err

    res.render('histories', { stories })
  })
}


const getPageCongratulations = (req, res) => {
  res.render('congratulations')
}

const getPageAdoption = (req, res) => {
  const { petId } = req.params
  connection.query('SELECT * FROM mascotas where id = ?', [petId], (err, pets) => {
    if(err) throw err
    res.render('adoption', { nombre: pets[0].nombre.toUpperCase(), id: pets[0].id, photo: pets[0].photo })
  })
  
}

const getPagePostulaste = (req, res) => {
  res.render('postulaste')
}

module.exports = {
  getDataHome,
  getHistory,
  getNew,
  getNews,
  getStories,
  getPageCongratulations,
  getPageAdoption,
  getPagePostulaste
}