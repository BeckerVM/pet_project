const connection = require('../db/connection')

const getDataHome = (req, res) => {
  
  connection.query('SELECT * FROM mascotas LIMIT 4', (err, pets) => {
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
  res.render('histories')
}

module.exports = {
  getDataHome,
  getHistory,
  getNew,
  getNews,
  getStories
}