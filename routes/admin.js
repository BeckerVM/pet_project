const express = require('express')
const router = express.Router()

const { isAuthenticatedAdmin } = require('../helpers/auth')

//CONTROLADORES
const adminController = require('../controllers/admin_controller')
const petController = require('../controllers/pet_controller')
const newController = require('../controllers/new_controller')
const historyController = require('../controllers/history_controller')

router.get('/home', isAuthenticatedAdmin, adminController.getDataDashboardHome)
router.get('/pets', petController.getPagePetsAdmin)
router.get('/news', newController.getPageNewsAdmin)
router.get('/stories', historyController.getPageStoriesAdmin)
router.get('/pets/add', petController.getPagePetAdd)
router.get('/stories/add', historyController.getPageAddHistoryAdmin)


//POST - ADMIN
router.post('/pets', petController.getAllPets)
router.post('/news', newController.getAllNews)
router.post('/stories', historyController.getAllStories)
router.post('/pets/add', petController.addPet)
router.post('/stories/add', adminController.addNewAmenidad)

module.exports = router