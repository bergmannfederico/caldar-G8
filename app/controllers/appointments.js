require('slf4n-logging');

const db = require('../models');
const Appointment = db.appointments;


// Get all appointments
exports.findAll = (req, res) =>{
    // logger.info('Endpoint called: getAppointments');
    Appointment.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || `An error ocurred trying to get all appointments`
            })
        })
};
/*
// Get appointments by Attribute
exports.findOneByAttr = (req, res) =>{
    logger.info(req.params.id);
    if(req.params.id){
        getAttribute(req.params.id)
        Appointment.findOne({id: req.params.id}).then(data => {
            if(!data) {
                return res.status(404).send({
                    message: `No appointment was not found`
                });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `An error ocurred trying to get appointment`
            })
        })
    }
    if(req.params.buildingId){
        getAttribute(req.params.buildingId)
        Appointment.findOne({buildingId: req.params.buildingId}).then(data => {
            if(!data) {
                return res.status(404).send({
                    message: `No appointment was not found`
                });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `An error ocurred trying to get appointment`
            })
        })
    }
};
*/

// Get appointment by ID
exports.findOne = (req, res) =>{
    Appointment.findOne({id: req.params.id})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: `Appointment with id ${req.params.id} was not found`
                });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `An error ocurred trying to get appointment with id ${req.params.id} `
            })
        })
};


// Create a new appointment
exports.create = (req, res) => {
    // logger.info(`Endpoint create Appointment called`);
    if(!req.body.id || !req.body.buildingId || !req.body.boilerId){
        return res.status(400).send({ message: "id, buildingId or boilerId missed"})
    }

    // Create a appointment
    const appointment = new Appointment({
        id: req.body.id,
        buildingId: req.body.buildingId,
        boilerId: req.body.boilerId,
        start_timestamp: req.body.start_timestamp,
        end_timestamp: req.body.end_timestamp,      
    });

    // Save appointment
    appointment
        .save(appointment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Cannot save appointment with id ${req.params.id} `
            });
        })
}

// Delete appointment by ID
exports.delete = (req, res) =>{
    const id = req.params.id;
    Appointment.findOneAndRemove({id:id}, { useFindAndModify: false }, (err, item) => {
        if (err) {
            return res.status(500).send({
                message: err.message || `An error ocurred removing appointment with id ${id} `
            })
        }       
        if (!item) {
            return res.status(404).send({message: `Appointment with id ${id} doesn't exist.`});
        }  
        res.send({ message: `Appointment was removed succesfully.`});
    });
};
