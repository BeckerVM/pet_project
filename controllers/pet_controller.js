const connection = require('../db/connection')

const getPet = (req, res) => {
  res.render('pet')
}
const getDataPetById = (req, res) => {
  const { petId } = req.params

  connection.query('SELECT * FROM mascotas where id = ?', [petId], (err, pet) => {
    if(err) throw err
    connection.query('SELECT * FROM imagenesmascotas where idmascota = ?', [petId], (err, petImages) => {
      if(err) throw err
      res.json({
        pet,
        petImages
      })
    })
  })
}

module.exports = {
  getDataPetById,
  getPet
}