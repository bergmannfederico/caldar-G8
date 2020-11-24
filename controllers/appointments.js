const express = require('express');
const router = express.Router();
const fs = require('fs');
let appointmentsData = JSON.parse(fs.readFileSync('./data/appointments.json'));


// API Functions

const getAllAppointments = () => appointmentsData;

const getAppointmentByAttribute = (req) => {
    let filterData = appointmentsData; 
    let flag_filter = false;
    if(req.query.id){
        filterData = filterData.filter(appointment => appointment.id === parseInt(req.query.id));
        flag_filter = true;
    }
    if(req.query.buildingId){
        filterData = filterData.filter(appointment => appointment.buildingId === parseInt(req.query.buildingId));
        flag_filter = true;
    }
    if(req.query.boilerId){
        filterData = filterData.filter(appointment => appointment.boilerId === parseInt(req.query.boilerId));
        flag_filter = true;
    }
    if(req.query.start_timestamp){
        filterData = filterData.filter(appointment => appointment.start_timestamp === String(req.query.start_timestamp));
        flag_filter = true;
    }
    if(req.query.end_timestamp){
        filterData = filterData.filter(appointment => appointment.end_timestamp === String(req.query.end_timestamp));
        flag_filter = true;
    }

    if(flag_filter){
        return (filterData);
    }/*else{
        res.status(400).json({msg: `Attribute not found`}); 
    }   */ 
}

function getAppointmentById(id){
    const found = appointmentsData.some(appointment => appointment.id === parseInt(id));

    if (found){
        return appointmentsData.filter(appointment => appointment.id === parseInt(id)); 
    } /*else{
        res.status(400).json({msg: `Appointments with ID = ${id} not found`});
    }*/
}



// Routing

router.get('/', (req, res) =>{
    res.json(getAllAppointments());
});

router.get('/attributes', (req, res) => {   
    res.json(getAppointmentByAttribute(req));
});

router.get('/:id', (req, res) =>{
    res.json(getAppointmentById(req.params.id));
});




module.exports = router;