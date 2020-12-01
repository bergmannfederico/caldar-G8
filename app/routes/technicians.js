const router = require('express').Router();
const technicians = require('../controllers/technicians.js');

// Get all technicians
router.get('/', technicians.findAll);

//Get technicians by sttribute
router.get('/attributes', technicians.findOneByAttr);

//Create a new technicians
router.post('/', technicians.create);

//Get technicians by ID
router.get('/:id', technicians.findOne);

//Delete technicians
router.delete('/:id', technicians.delete);




module.exports = router;