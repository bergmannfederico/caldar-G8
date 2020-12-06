
const db = require('../models');
const boilerData = db.boilersData;


// Get all boilers-data
exports.findAll = (require, response) => {
    boilerData.find({})
        .then(data=> {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                msg: "The requirement could not be found"
            });
        });
};

// Get boiler-data by ID
exports.findByIdData = (require, response) => {
    boilerData.find({ id: require.params.id })
        .then(data => {
            if (!data) {
                return response.status(404).send({
                    msg: `No boiler-data found with the id ${require.params.id}.`
                })
            }
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                msg: err.message || "Some error occurred while retrieving boiler-data."
            });
        });
};

// Get boiler-data by attribute: typeID
exports.findByTypeId = (require, response) => {
    boilerData.find({ typeId: require.params.typeId })
        .then(data => {
            if (!data) {
                return response.status(404).send({
                    msg: `No boiler-data found with the typeId ${require.params.typeId}.`
                })
            }
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                msg: err.message || "Some error occurred while retrieving boiler-data."
            });
        });
};

// Get boiler-data by attribute: maintenance_rate
exports.findByMaintenanceRate = (require, response) => {
    boilerData.find({ maintenance_rate: require.params.maintenance_rate })
        .then(data => {
            if (!data) {
                return response.status(404).send({
                    msg: `No boiler-data found with the maintenance rate ${require.params.maintenance_rate}.`
                })
            }
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                msg: err.message || "Some error occurred while retrieving boiler-data."
            });
        });
};

//Delete boiler-data by Id
exports.delete = (require, response) => {
    const id = require.params.id;
    boilerData.findOneAndDelete({ id }, { useFindAndModify: false })
        .then(() =>
            response.send({ message: "Boiler-data was deleted." })
        )
        .catch(err => {
            response.status(500).send({ msg: "Error trying delete boiler-data with id:" + id });
        });
};

//Create new boiler-data
exports.create = (require, response) => {
    if (!require.body.id || !require.body.typeId || !require.body.maintenance_rate || !require.body.hour_maintenance_cost || !require.body.hour_eventual_cost) {
        return response.status(400).send({
            msg: "No field can be empty."
        });
    }
    //Create new boiler-data
    const boiler = new boilerData({
        id: require.body.id,
        typeId: require.body.typeId,
        maintenance_rate: require.body.maintenance_rate,
        hour_maintenance_cost: require.body.hour_maintenance_cost,
        hour_eventual_cost: require.body.hour_eventual_cost
    })
    boiler.save(boiler)
    .then(data => {
        response.send(data);
    })
    .catch(err => {
        response.status(500).send({
            msg: err.message || "Some error ocurred while creating the boiler-data."
        });
    });
};

//Update boiler-data by Id
exports.update = (require, response) => {
    if (!require.body) {
        return response.status(400).send({
            msg: "No field can be empty!"
        });
    }
    if (!require.body.id || !require.body.typeId || !require.body.maintenance_rate || !require.body.hour_maintenance_cost || !require.body.hour_eventual_cost) {
        res.status(400).send({
            msg: "Content cannot be empty!"
        });
        return;
    }
    const id = require.params.id;

    boilerData.findOneAndUpdate({ id }, require.body, { useFindAndModify: true })
        .then(data => {
            if (!data) {
                return response.status(404).send({
                    msg: `No Boiler-data found with the id=${id}.`
                });
            } else response.send({ msg: `The boiler data with id=${id} was modified.`});
        })
        .catch(err => {
            response.status(500).send({ msg: "An error occurred while trying to update the data"});
        });
};