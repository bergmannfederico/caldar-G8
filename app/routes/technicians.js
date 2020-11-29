const router = require('express').Router();
const technicians = require('../controllers/technicians.js');

// Get all technicians
router.get('/', technicians.findAll);

//Get building by technicians
router.get('/attributes', technicians.findOneByAttr);




module.exports = router;