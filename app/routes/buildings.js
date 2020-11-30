const router = require('express').Router();
const building = require('../controllers/buildings.js');

// Get all buildings
router.get('/', building.findAll);

//Get building by Attribute
router.get('/attributes', building.findOneByAttr);

//Get building by ID
router.get('/:id', building.findOne);

//Delete building
router.delete('/:id', building.delete);

module.exports = router;
