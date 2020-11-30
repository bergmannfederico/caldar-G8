const router = require('express').Router();
const boilers = require('../controllers/boilers-data.js');

// Get all boiler
router.get('/', boilers.findAll);

//Get boiler by Attribute: id
router.get('/id/:id', boilers.findById);

//Get boiler by Attribute: type id
router.get('/typeId/:typeId', boilers.findByTypeId);

//Get boiler by maintenance rate
router.get('/maintenance_rate/:maintenance_rate', boilers.findByMaintenanceRate);

//Delete boiler by id
router.delete('/id/:id', boilers.delete);

module.exports = router;