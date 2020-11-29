const router = require('express').Router();
const technicians = require('../controllers/technicians.js');

// Get all technicians
router.get('/', technicians.findAll);




module.exports = router;