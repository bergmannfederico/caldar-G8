const router = require('express').Router();
const boiler = require('../controllers/boilers.js');

// Get all boiler
router.get('/', boiler.findAll);

//Get boiler by Attribute: skillsId
router.get('/skillsId/:skillsId', boiler.findOneBySkillsId);

//Get boiler by Attribute: description
router.get('/description/:description', boiler.findOneByDescription);

//Get boiler by ID
router.get('/id/:id', boiler.findOneById);

//Delete boiler by id
router.delete('/id/:id', boiler.delete);

//Create new boiler
router.post('/', boiler.create);

//Update boiler by Id
router.put('/:id', boiler.update);

module.exports = router;
