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

const getPagePetAddImage = (req, res) => {
  const { petId } = req.params 
  connection.query('SELECT * FROM imagenesmascotas WHERE idmascota = ?', [petId], (err, images) => {
    if (err) throw err;
    res.render('admin_pet_add_images' , { url: 'AGREGAR FOTOS MASCOTA', images, idmascota: petId })
  })
}

const getPagePetEdit = (req, res) => {
  const { petId } = req.params

  connection.query('SELECT * FROM mascotas where id = ?', [petId], (err, pets) => {
    if (err) throw err
    let pet = pets[0]
    res.render('admin_pet_edit', { 
      url: 'EDITAR MASCOTA',
      pet,
      nombre: pet.nombre, femenino: pet.sexo === 'F' ? true : false,
      masculino: pet.sexo === 'M' ? true : false,
      perro: pet.clase === 'Perro' ? true : false,
      gato: pet.clase === 'Gato' ? true : false,
      tgrande: pet.tamano === 'Grande' ? true : false,
      tmediano: pet.tamano === 'Mediano' ? true : false,
      tpequeno: pet.tamano === 'Pequeño' ? true : false,
      pgrande: pet.pelaje === 'Grande' ? true : false,
      pmediano: pet.pelaje === 'Medio' ? true : false,
      pcorto: pet.pelaje === 'Corto' ? true : false,
      cachorro: pet.crecimiento === 'Cachorro' ? true : false,
      adulto: pet.crecimiento === 'Adulto' ? true : false,
      senior: pet.crecimiento === 'Senior' ? true : false,
    })
  })
}

const updatePet = (req, res) => {
  const { petId } = req.params
  const { nombre, informacion, sexo, tamano, pelaje, historia, crecimiento, clase } = req.body
  connection.query(
    'UPDATE mascotas SET nombre = ?, informacion = ?, sexo = ?, pelaje = ?, tamano = ?, historia = ?, clase = ?, crecimiento = ? WHERE id = ?',
    [nombre, informacion, sexo, pelaje, tamano, historia, clase, crecimiento, petId],
    (err, results) => {
      if (err) throw err;
      res.redirect('/dashboard/pets')
    }
  )

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

const addImagePet = async (req, res) => {
  const { petId } = req.params
  const resultc = await cloudinary.uploader.upload(req.file.path)

  connection.query(
    'INSERT INTO imagenesmascotas (idmascota, url) VALUES (?, ?)',
    [petId, resultc.url],
    async (err) => {
      if (err) throw err;

      await fs.unlink(req.file.path)
      res.redirect('/dashboard/pets/images/add/' + petId)
    }
  )
}

const deleteImagePet = (req, res) => {
  const { petId, imageId } = req.params

  connection.query(
    'DELETE FROM imagenesmascotas where id = ?',
    [imageId],
    (err, results) => {
      if (err) throw err;
      res.redirect('/dashboard/pets/images/add/' + petId)
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
  connection.query('SELECT * FROM mascotas WHERE estado = ? OR estado = ?', ['Libre', 'Procesado'], (err, pets) => {
    if(err) throw err

    res.json({ pets })
  })
}

const getPetsByAge = (req, res) => {
  const { petAge } = req.params

  connection.query('SELECT * FROM mascotas WHERE crecimiento = ? AND estado = ? OR estado = ?', [petAge, 'Libre', 'Procesado'], (err, pets) => {
    if(err) throw err

    res.json({ pets })
  })
}

const postulation = (req, res) => {
  const {idmascota, paterno, materno, nombre, dni, direccion, telefono, celular, email, ocupacion } = req.body

  connection.query('SELECT * FROM postulantes WHERE dni = ?', [dni], (err, postulantes) =>  {
    if(err) throw err;

    if(postulantes.length === 0) {
      connection.query(
        'INSERT INTO postulantes (dni, nombres, apellidop, apellidom, direccion, celular, email, telefono, ocupacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [dni, nombre, paterno, materno, direccion, celular, email, telefono, ocupacion],
        (err, result) => {
          if (err) throw err;

          connection.query(
            'INSERT INTO postulaciones(idmascota, dnipostulante, fecha, estado) VALUES (?, ?, ?, ?)',
            [idmascota, dni, new Date().toLocaleDateString("en-US"), 'Pendiente'],
            (err, result) => {
              if (err) throw err;
              
              connection.query(
                'UPDATE mascotas SET estado = ? WHERE id = ?',
                ['Procesado', idmascota],
                (err, result) => {
                  if (err) throw err
                  res.redirect('/postulaste')
                }
              )
            }
          )
        }
      )
    } else {
      connection.query(
        'INSERT INTO postulaciones(idmascota, dnipostulante, fecha, estado) VALUES (?, ?, ?, ?)',
        [idmascota, dni, new Date().toLocaleDateString("en-US"), 'Pendiente'],
        (err, result) => {
          if (err) throw err;

          connection.query(
            'UPDATE mascotas SET estado = ? WHERE id = ?',
            ['Procesado', idmascota],
            (err, result) => {
              if (err) throw err
              res.redirect('/postulaste')
            }
          )
        }
      )
    }
    
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
  getPagePetEdit,
  addPet,
  updatePet,
  getPagePetAddImage,
  deleteImagePet,
  addImagePet,
  postulation
}