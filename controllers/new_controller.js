const connection = require('../db/connection')

const getPageNewsAdmin = (req, res) => {
  res.render('admin_news', { url: 'NOTICIAS' })
}

const getAllNews = (req, res) => {
  
  connection.query('SELECT * FROM amenidades where tipo = ?', ['Noticia'], (err, news) => {
    if(err) throw err;
    
    res.json({
      news
    })
  })
}

module.exports = { getPageNewsAdmin, getAllNews }