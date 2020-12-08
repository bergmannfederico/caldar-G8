const router = require('express').Router();
const appointments = require('../controllers/appointments.js');

// Get all appointments
router.get('/', appointments.findAll);

//Get appointments by Attribute
router.get('/attributes/buildingId/:buildingId', appointments.findOneByBuildingID);
//Get appointments by Attribute
router.get('/attributes/boilerId/:boilerId', appointments.findOneByBoilerID);

//Get appointments by ID
router.get('/:id', appointments.findOne);

//Create appointments
router.post('/', appointments.create);

//Update appointments
router.put('/:id', appointments.update)

//Delete appointments
router.delete('/:id', appointments.delete);

module.exports = router;