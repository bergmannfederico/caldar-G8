const router = require('express').Router();
const appointments = require('../controllers/appointments.js');

// Get all appointments
router.get('/', appointments.findAll);

//Get appointments by Attribute
router.get('/attributes', appointments.findOneByAttr);

//Get appointments by ID
router.get('/:id', appointments.findOne);

//Create appointments
router.post('/', appointments.create);

//Delete appointments
router.delete('/:id', appointments.delete);


module.exports = router;
