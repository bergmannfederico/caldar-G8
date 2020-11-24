const { response } = require('express');
const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');

// Get all boilers

router.get('/', (require, response) => {
    response.json(boilers)
});

// Get boiler by ID

router.get('/id/:id', (require, response) => {
    const idFilter = (require) => (boiler) => boiler.id === (require.params.id);
    const element = boilers.some(idFilter(require));

    if(element == true) {
        response.json(boilers.filter(idFilter(require)));
    } else {
        response.status(400).json({ msg: `No boiler found with the id ${req.params.id}`});
    }
})

module.exports = router;