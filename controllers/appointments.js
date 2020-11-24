const express = require('express');
const router = express.Router();
const fs = require('fs');
let appointmentsData = JSON.parse(fs.readFileSync('./data/appointments.json'));
/*
// Get all appointments
router.get('/', (req, res) =>{
    res.send(appointmentsData);
});

// getAllAppointments
router.get('/getAllAppointments', (req, res) =>{
    res.send(appointmentsData);
});*/

// getAppointmentById
router.get('/:id', (req, res) =>{
    const found = appointmentsData.some(appointment => appointment.id === parseInt(req.params.id));

    if (found){
        res.json(appointmentsData.filter(appointment => appointment.id === parseInt(req.params.id))); 
    } else{
        res.status(400).json({msg: `Appointments with ID = ${req.params.id} not found`});
    }
});

module.exports = router;