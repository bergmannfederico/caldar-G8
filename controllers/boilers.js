const { response } = require('express');
const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');
const fs = require ('fs');
const dataPath = '.data/boilers.json';


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
    const idFilter = (require) => (boiler) => boiler.skillsId === (require.params.skillsId);
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

app.delete('/api/building/:id', (req, res) => {
    const found = boilers.some(boilers => boilers._id.$oid === req.params.id);
    if (found) {
        res.json(buildings.filter(building => building._id.$oid === req.params.id));
    } else {
        res.status(400).json({msg: `No building with id: ${req.params.id}`});
    }
});

module.exports = router;