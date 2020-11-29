const express = require('express');
const router = express.Router();
const boilers = require('../../data/boilers.json');

// Get all boilers

router.get('/', (require, response) => {
    response.json(boilers)
});

// Get boiler by ID

router.get('/id/:id', (require, response) => {
    const idFilter = (require) => (boiler) => boiler.id === parseInt(require.params.id);
    const element = boilers.some(idFilter(require));

    if(element == true) {
        response.json(boilers.filter(idFilter(require)));
    } else {
        response.status(400).json({ msg: `No boiler found with the id ${require.params.id}`});
    }
})

// Get boiler by attribute: skillsId

router.get('/skillsId/:skillsId', (require, response) => {
    const idFilter = (require) => (boiler) => boiler.skillsId.includes(parseInt(require.params.skillsId));
    const element = boilers.some(idFilter(require));

    if (element == true) {
        response.json(boilers.filter(idFilter(require)));
    } else {
        response.status(400).json({ msg: `No boiler found with the skillsId ${require.params.skillsId}`})
    }
})

// Get boiler by attribute: description

router.get('/description/:description', (require, response) => {
    const idFilter = (require) => (boiler) => boiler.description === (require.params.description);
    const element = boilers.some(idFilter(require));

    if (element == true) {
        response.json(boilers.filter(idFilter(require)));
    } else {
        response.status(400).json({ msg: `No boiler found with the description ${require.params.description}`})
    }
})

//Delete boiler by id

router.delete("/:id", (require, response) => {
    const idFilter = (require) => (boiler) => boiler.id === parseInt(require.params.id);
    const element = boilers.some(idFilter(require));
  
    if (element == true) {
      response.json({
        msg: "Boiler deleted",
        boilers: boilers.filter((boiler) => !idFilter(require)(boiler)),
      });
    } else {
      response.status(400).json({ msg: `No bolier with the id of ${require.params.id}` });
    }
  });
  
module.exports = router;