const router = require('express').Router();
const boilers = require('../controllers/boilers.js');

// Get all buildings
router.get('/boilers', boilers.findAll);

//Get building by Attribute: skillsId
router.get('/skillsId', boilers.findOneBySkillsId);

//Get building by Attribute: description
router.get('/description', boilers.findOneByDescription);

//Get building by ID
router.get('/:id', boilers.findOneById);

//Delete building
router.delete('/:id', boilers.delete);

module.exports = router;
