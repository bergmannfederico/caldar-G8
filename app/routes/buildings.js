const router = require('express').Router();
const building = require('../controllers/buildings.js');

// Get all buildings
router.get('/', building.findAll);

//Get building by Attribute
router.get('/attributes', building.findByAttr);

//Create a new building
router.post('/', building.create);

//Update building by ID
router.put('/:id', building.update);

//Get building by ID
router.get('/:id', building.findOne);

//Delete building
router.delete('/:id', building.delete);

module.exports = router;
