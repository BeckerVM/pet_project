const express = require('express')
const router = express.Router()

//CONTROLADORES
const indexController = require('../controllers/index_controller')
const petController = require('../controllers/pet_controller')

router.get('/', indexController.getDataHome)

//MASCOTAS 
router.get('/pets', petController.getPets)

router.post('/pets', petController.getAllPets)

router.get('/pets/:petAge', (req, res) => res.render('pets'))

router.post('/pets/:petAge', petController.getPetsByAge)

router.get('/pet/:petId', petController.getPet)

router.post('/pet/:petId', petController.getDataPetById)

//AMANIDDADES
router.get('/history/1', indexController.getHistory)

router.get('/new/1', indexController.getNew)

module.exports = router