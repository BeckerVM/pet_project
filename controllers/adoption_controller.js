const connection = require('../db/connection')


const getPageAdoptionsAdmin = (req, res) => {
  res.render('admin_adoptions', { url: 'ADOPCIONES' })
}

const getAdoptionsAdmin = (req, res) => {

  connection.query(
    'select direccion, adopciones.id, postulantes.dni, nombres, apellidop, apellidom, telefono, celular, photo, nombre, fecha from adopciones inner join postulantes on adopciones.dnipostulante = postulantes.dni inner join mascotas on adopciones.idmascota = mascotas.id',
    (err, adoptions) => {
      if(err) throw err
      res.json({
        adoptions
      })
    }
  ) 
}


const confirmAdoption = (req, res) => {
  const { postId } = req.params
  let petId = null
  let postulantDni = null

  connection.query('SELECT * FROM postulaciones where id = ?', [postId], (err, postulations) => {
    petId = postulations[0].idmascota
    postulantDni = postulations[0].dnipostulante

    connection.query(
      'UPDATE postulaciones SET estado = ? WHERE id = ?',
      ['Confirmado', postId],
      (err, result) => {
        if(err) throw err
        
        connection.query(
          'UPDATE mascotas SET estado = ? WHERE id = ?',
          ['Adoptado', petId],
          (err, result) => {
            if(err) throw err
            
            connection.query(
              'INSERT INTO adopciones (dnipostulante, idmascota, fecha) VALUES (?, ?, ?)',
              [postulantDni, petId, new Date().toLocaleDateString("en-US")],
              (err, result) => {
                if(err) throw err
                res.redirect('/dashboard/postulations')
              }
            )
            
          }
        )
        
      }
    )
  
  })

}

const rejectAdoption = (req, res) => {
  const { postId } = req.params
  let petId = null

  connection.query('SELECT * FROM postulaciones where id = ?', [postId], (err, postulations) => {
    petId = postulations[0].idmascota

    connection.query(
      'UPDATE postulaciones SET estado = ? WHERE id = ?',
      ['Rechazado', postId],
      (err, result) => {
        if(err) throw err
        
        connection.query(
          'UPDATE mascotas SET estado = ? WHERE id = ?',
          ['Libre', petId],
          (err, result) => {
            if(err) throw err

            res.redirect('/dashboard/postulations')
            
          }
        )
        
      }
    )
  
  })
}

module.exports = {
  confirmAdoption,
  rejectAdoption,
  getPageAdoptionsAdmin,
  getAdoptionsAdmin
}