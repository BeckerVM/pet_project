const connection = require('../db/connection')
const cloudinary = require('cloudinary').v2
const fs = require('fs-extra')

cloudinary.config({ 
  cloud_name: 'dripm8g4s', 
  api_key: '537988747936494', 
  api_secret: 'eQn7ynR6lGimxTxBqU9qVB16FtM' 
})


const getPet = (req, res) => {
  res.render('pet')
}

const getPagePetsAdmin = (req, res) => {
  res.render('admin_pets', { url: 'MASCOTAS'})
}

const getPagePetAdd = (req, res) => {
  res.render('admin_pet_add', { url: 'AGREGAR NUEVA MASCOTA' })
}

const addPet = async (req, res) => {
  const { nombre, informacion, sexo, tamano, pelaje, historia, crecimiento, clase } = req.body
  const resultc = await cloudinary.uploader.upload(req.file.path)

  connection.query(
    'INSERT INTO mascotas (nombre, informacion, sexo, pelaje, tamano, historia, clase, estado, photo, edad, crecimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, informacion, sexo, pelaje, tamano, historia, clase, 'Libre', resultc.url, 0, crecimiento],
    async (err, result) => {
      if (err) throw err;
      await fs.unlink(req.file.path)
     
      connection.query(
        'INSERT INTO imagenesmascotas (idmascota, url) VALUES (?, ?)',
        [result.insertId, resultc.url],
        (err) => {
          if (err) throw err;
          res.redirect('/dashboard/pets')
        }
      )
    }
  )
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
  getPagePetAdd,
  addPet
}