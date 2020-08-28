const connection = require('../db/connection')

const getPageEntrevista = (req, res) => {
  const { petId } = req.params
  
  connection.query('SELECT * FROM mascotas where id = ?', [petId], (err, pets) => {
    if(err) throw err

    if(pets.length > 0) {
      const pet = pets[0]

      if(pet.estado == 'Procesado') {
        res.render('admin_entrevista', { url: 'PROGRAMAR ENTREVISTA', petId })
      } else {
        res.redirect('/dashboard/postulations')
      }
      
    } else {
      console.log('lol')
      res.redirect('/dashboard/postulations')
    }
  })
}

const getDataPageEntrevista = (req, res) => {
  const { petId } = req.params

  connection.query('SELECT * FROM mascotas where id = ?', [petId], (err, pets) => {
    if(err) throw err

    connection.query('SELECT * FROM trabajadores', (err, workers) => {
      if(err) throw err

      res.json({
        pet: pets[0],
        workers
      })
    })
  })
}

module.exports = {
  getPageEntrevista,
  getDataPageEntrevista
}