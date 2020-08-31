const connection = require('../db/connection')

const getPageEntrevista = (req, res) => {
  const { petId, postDni, postId } = req.params
  
  connection.query('SELECT * FROM mascotas where id = ?', [petId], (err, pets) => {
    if(err) throw err

    if(pets.length > 0) {
      const pet = pets[0]

      if(pet.estado == 'Procesado') {
        res.render('admin_entrevista', { url: 'PROGRAMAR ENTREVISTA', petId, postDni, postId })
      } else {
        res.redirect('/dashboard/postulations')
      }
      
    } else {
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

const entrevistar = (req, res) => {
  const hour = req.body.date.split(':')[0]
  const { workerId, postId, postDni, date } = req.body
  
  connection.query(
    `SELECT * FROM entrevistas WHERE dnitrabajador = ? AND fecha LIKE ?`,
    [workerId, `${hour}%`],
    (err, results) => {
      if(err) throw err
      
      if(results.length > 0) {
        res.status(400).json({ error: true })
      } else {
        connection.query(
          'INSERT INTO entrevistas (dnitrabajador, dnipostulante, idpostulacion, fecha) VALUES (?, ?, ?, ?)',
          [workerId, postDni, postId, date],
          (err, results) => {
            if(err) throw err

            connection.query(
              'UPDATE postulaciones SET estado = ? WHERE id = ?',
              ['En Proceso', postId],
              (err, result) => {
                if(err) throw err
                
                res.json({
                  message: 'Entrevista Programada Correctamente'
                })
              }
            )

          }
        )
      }
    }
  )
}

const getEntrevista = (req, res) => {
  const { postId } = req.params
  
  connection.query(
    'SELECT nombrecompleto, entrevistas.fecha, entrevistas.id as identrevista FROM entrevistas INNER JOIN trabajadores ON dnitrabajador = trabajadores.dni WHERE idpostulacion = ?',
    [postId],
    (err, ent) => {
      if(err) throw err

      res.json({
        entrevistas: ent
      })
    }
  )
}

module.exports = {
  getPageEntrevista,
  getDataPageEntrevista,
  entrevistar,
  getEntrevista
}