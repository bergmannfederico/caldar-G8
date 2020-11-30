const router = require('express').Router();
const boilers = require('../controllers/boilers.js');

// Get all boiler
router.get('/', boilers.findAll);

//Get boiler by Attribute: skillsId
router.get('/skillsId/:skillsId', boilers.findOneBySkillsId);

//Get boiler by Attribute: description
router.get('/description', boilers.findOneByDescription);

//Get boiler by ID
router.get('/id/:id', boilers.findOneById);

//Delete boiler by id
router.delete('/id/:id', boilers.delete);

module.exports = router;
