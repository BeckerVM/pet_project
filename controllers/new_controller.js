const connection = require('../db/connection')

const getPageNewsAdmin = (req, res) => {
  res.render('admin_news', { url: 'NOTICIAS' })
}

getPageAddNewAdmin = (req, res) => {
  res.render('admin_new_add', { url: 'AGREGAR NOTICIA'})
}

const getAllNews = (req, res) => {
  
  connection.query('SELECT * FROM amenidades where tipo = ?', ['Noticia'], (err, news) => {
    if(err) throw err;
    
    res.json({
      news
    })
  })
}

module.exports = { getPageNewsAdmin, getAllNews, getPageAddNewAdmin }