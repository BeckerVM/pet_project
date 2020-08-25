const connection = require('../db/connection')

const getPageAdminPostulation = (req, res) => {
  res.render('admin_postulations', { url: 'POSTULACIONES' })
}

const getAdminPostulations = (req, res) => {
  connection.query(
    'select  postulaciones.id, postulaciones.estado, dni, nombres, apellidop, apellidom, telefono, celular, email, photo, nombre from postulaciones inner join postulantes on postulaciones.dnipostulante = postulantes.dni inner join mascotas on postulaciones.idmascota = mascotas.id',
    (err, postulations) => {
      if(err) throw err
      res.json({
        postulations
      })
    }
  )
}

module.exports = {
  getPageAdminPostulation,
  getAdminPostulations
}