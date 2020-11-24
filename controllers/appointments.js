const express = require('express');
const router = express.Router();
const fs = require('fs');
let appointmentsData = JSON.parse(fs.readFileSync('./data/appointments.json'));

// Get all appointments
router.get('/', (req, res) =>{
    res.send(appointmentsData);
});

module.exports = router;