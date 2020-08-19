const connection = require('../db/connection')

const getPet = (req, res) => {
  res.render('pet')
}

const getPagePetsAdmin = (req, res) => {
  res.render('admin_pets', { url: 'MASCOTAS'})
}

const getPagePetAdd = (req, res) => {
  res.render('admin_pet_add', { url: 'AGREGAR NUEVA MASCOTA' })
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

const getPets = (req, res) => {
  res.render('pets')
}

const getAllPets = (req, res) => {
  connection.query('SELECT * FROM mascotas', (err, pets) => {
    if(err) throw err

    res.json({ pets })
  })
}

const getPetsByAge = (req, res) => {
  const { petAge } = req.params

  connection.query('SELECT * FROM mascotas WHERE crecimiento = ?', [petAge], (err, pets) => {
    if(err) throw err

    res.json({ pets })
  })
}

module.exports = {
  getDataPetById,
  getPet,
  getPets,
  getAllPets,
  getPetsByAge,
  getPagePetsAdmin,
  getPagePetAdd
}