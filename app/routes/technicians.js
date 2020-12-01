const router = require('express').Router();
const technicians = require('../controllers/technicians.js');

// Get all technicians
router.get('/', technicians.findAll);

//Get technicians by Attribute
router.get('/attributes', technicians.findByAttr);

//Create a new technicians
router.post('/', technicians.create);

//Get technicians by ID
router.get('/:id', technicians.findOne);

//Update technicians by ID
router.put('/:id', technicians.update);

//Delete technicians
router.delete('/:id', technicians.delete);




module.exports = router;