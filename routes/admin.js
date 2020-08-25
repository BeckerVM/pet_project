const express = require('express')
const router = express.Router()

const { isAuthenticatedAdmin } = require('../helpers/auth')

//CONTROLADORES
const adminController = require('../controllers/admin_controller')
const petController = require('../controllers/pet_controller')
const newController = require('../controllers/new_controller')
const historyController = require('../controllers/history_controller')
const donationController = require('../controllers/donation_controller')
const workerController = require('../controllers/worker_controller')
const postulationController = require('../controllers/postulation_controller')

router.get('/home', /*isAuthenticatedAdmin,*/ adminController.getDataDashboardHome)
router.get('/pets', petController.getPagePetsAdmin)
router.get('/news', newController.getPageNewsAdmin)
router.get('/stories', historyController.getPageStoriesAdmin)
router.get('/pets/add', petController.getPagePetAdd)
router.get('/stories/add', historyController.getPageAddHistoryAdmin)
router.get('/news/add', newController.getPageAddNewAdmin)
router.get('/pets/edit/:petId', petController.getPagePetEdit)
router.get('/pets/images/add/:petId', petController.getPagePetAddImage)
router.get('/pets/images/delete/:petId/:imageId', petController.deleteImagePet)
router.get('/donations', donationController.getPageAdminDonation)
router.get('/workers', workerController.getPageAdminWorker)
router.get('/postulations', postulationController.getPageAdminPostulation)

//POST - ADMIN
router.post('/pets', petController.getAllPets)
router.post('/news', newController.getAllNews)
router.post('/stories', historyController.getAllStories)
router.post('/pets/add', petController.addPet)
router.post('/pets/edit/:petId', petController.updatePet)
router.post('/pets/images/add/:petId', petController.addImagePet)
router.post('/amenidad/add', adminController.addNewAmenidad)
router.post('/donations', donationController.getDonations)
router.post('/workers', workerController.getWorkers)
router.post('/workers/add', workerController.addWorker)
router.post('/postulations', postulationController.getAdminPostulations)

module.exports = router