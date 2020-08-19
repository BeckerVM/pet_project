const connection = require('../db/connection')

const getPageStoriesAdmin = (req, res) => {
  res.render('admin_stories', { url: 'HISTORIAS' })
}

const getAllStories = (req, res) => {
  
  connection.query('SELECT * FROM amenidades where tipo = ?', ['Historia'], (err, stories) => {
    if(err) throw err;
    
    res.json({
      stories
    })
  })
}


module.exports = { getPageStoriesAdmin, getAllStories }