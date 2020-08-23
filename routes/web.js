const express = require('express')
const router = express.Router()

const { noAuthenticated } = require('../helpers/auth')

//CONTROLADORES
const indexController = require('../controllers/index_controller')
const petController = require('../controllers/pet_controller')
const donationController = require('../controllers/donation_controller')

router.get('/',  noAuthenticated, indexController.getDataHome)

//MASCOTAS 
router.get('/pets',  noAuthenticated, petController.getPets)

router.post('/pets', petController.getAllPets)

router.get('/pets/:petAge',  noAuthenticated, (req, res) => res.render('pets'))

router.post('/pets/:petAge', petController.getPetsByAge)

router.get('/pet/:petId',  noAuthenticated, petController.getPet)

router.post('/pet/:petId', petController.getDataPetById)

router.post('/donation', donationController.sendDonation)

//AMANIDADES
router.get('/history/:historyId',  noAuthenticated, indexController.getHistory)

router.get('/new/:newId',  noAuthenticated, indexController.getNew)

router.get('/news',  noAuthenticated, indexController.getNews)

router.get('/stories',  noAuthenticated, indexController.getStories)

module.exports = router