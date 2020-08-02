const connection = require('../db/connection')

const getDataHome = (req, res) => {
  
  connection.query('SELECT * FROM mascotas LIMIT 4', (err, pets) => {
    if(err) throw err;

    res.render('index', { pets })
  })
}

const getHistory = (req, res) => {
  res.render('history')
}

const getNew = (req, res) => {
  res.render('new')
}

module.exports = {
  getDataHome,
  getHistory,
  getNew
}