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

//AMANIDADES
router.get('/history/:historyId', indexController.getHistory)

router.get('/new/:newId', indexController.getNew)

router.get('/news', indexController.getNews)

router.get('/stories', indexController.getStories)

module.exports = router