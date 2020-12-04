const router = require('express').Router();
const boilerData = require('../controllers/boilers-data.js');

// Get all boiler
router.get('/', boilerData.findAll);

//Get boiler by Attribute: id
router.get('/id/:id', boilerData.findById);

//Get boiler by Attribute: type id
router.get('/typeId/:typeId', boilerData.findByTypeId);

//Get boiler by maintenance rate
router.get('/maintenance_rate/:maintenance_rate', boilerData.findByMaintenanceRate);

//Delete boiler by id
router.delete('/id/:id', boilerData.delete);

//Create new boiler
router.post('/', boilerData.create);

//Update boiler by Id
router.put('/:id', boilerData.update);

module.exports = router;