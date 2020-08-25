const connection = require('../db/connection')

const getPageAdminWorker = (req, res) => {
  res.render('admin_workers', { url: 'TRABAJADORES' })
}

const addWorker = (req, res) => {
  const { dni, nombre, celular } = req.body
  console.log(req.body)

  connection.query('SELECT * FROM trabajadores where dni = ?', [dni], (err, workers) => {
    if(err) throw err
    if(workers.length > 0) {
      res.status(400).json({
        message: 'Trabajador existente, no se puede registrar'
      })
    } else {
      connection.query(
        'INSERT INTO trabajadores (dni, nombrecompleto, celular) VALUES (?, ?, ?)',
        [dni, nombre, celular], 
        (err, result) => {
          if(err) throw err
          res.json({ message: 'Trabajador registrado correctamente' })
        }
      )
    }
  })
}

const getWorkers = (req, res) => {
  connection.query('SELECT * FROM trabajadores', (err, workers) => {
    if(err) throw err
    res.json({
      workers
    })
  })
}


module.exports = {
  getPageAdminWorker,
  addWorker,
  getWorkers
}