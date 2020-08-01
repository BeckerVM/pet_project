const express = require('express')
const router = express.Router()

//CONTROLADORES
const indexController = require('../controllers/index_controller')
const petController = require('../controllers/pet_controller')

router.get('/', indexController.getDataHome)

router.get('/pets', (req, res) => {
  res.render('pets')
})

router.get('/pet/:petId', petController.getPet)

router.post('/pet/:petId', petController.getDataPetById)

module.exports = router