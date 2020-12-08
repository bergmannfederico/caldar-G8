require('slf4n-logging');
const logger = LoggerFactory.getLogger('Appointments')

const db = require('../models');
const Appointment = db.appointments;


// Get all appointments
exports.findAll = (req, res) => {
    // logger.info('Endpoint called: getAppointments');
    Appointment.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `An error ocurred trying to get all appointments`
            })
        })
};

// Get appointment by ID
exports.findOne = (req, res) => {
    Appointment.findOne({ id: req.params.id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Appointment with id ${req.params.id} was not found.`
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving appointments."
            });
        });
};

// Create a new appointment
exports.create = (req, res) => {
    // logger.info(`Endpoint create Appointment called`);
    if (!req.body.id || !req.body.buildingId || !req.body.boilerId) {
        return res.status(400).send({ message: "id, buildingId or boilerId missed" })
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

//Update appointement by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            msg: "Data to update cannot to be empty!"
        });
    }

    //Validate request
    if (!req.body.buildingId || !req.body.boilerId) {
        res.status(400).send({
            msg: "Content cannot be empty!"
        });
        return;
    }
    const id = req.params.id;

    Appointment.findOneAndUpdate({ id }, req.body, { useFindAndModify: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Cannot update Appointment with id=${id}. Maybe appointment was not found!`
                });
            } else res.send({ msg: "Appointment was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({ msg: "Error updating Appointment with id=" + id });
        });
};

// Delete appointment by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Appointment.findOneAndRemove({ id: id }, { useFindAndModify: false }, (err, item) => {
        if (err) {
            return res.status(500).send({
                message: err.message || `An error ocurred removing appointment with id ${id} `
            })
        }
        if (!item) {
            return res.status(404).send({ message: `Appointment with id ${id} doesn't exist.` });
        }
        res.send({ message: `Appointment was removed succesfully.` });
    });
};

//Get Appointmentby Attributes

//Get by Building ID
exports.findOneByBuildingID = (req, res) => {
    Appointment.findOne({ buildingId: req.params.buildingId })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Appointment with building id ${req.params.buildingId} was not found.`
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving appointments."
            });
        });
};

//Get byBoiler ID
exports.findOneByBoilerID = (req, res) => {
    Appointment.findOne({ boilerId: req.params.boilerId })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Appointment with boiler id ${req.params.boilerId} was not found.`
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving appointments."
            });
        });
};