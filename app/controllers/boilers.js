const db = require('../models');
const Boiler = db.boilers;

// Get all boilers
exports.findAll = (require, response) => {
    Boiler.find({})
        .then(data=> {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                msg: "The requirement could not be found"
            })
        })
};

//Get a boiler by Id
exports.findOneById = (require, response) => {
    Boiler.findOne({ id: require.params.id })
        .then(data => {
            if (!data) {
                return response.status(404).send({
                    msg: `No boiler found with the id ${require.params.id}.`
                })
            }
            response.send(data)
        })
        .catch(err => {
            response.status(500).send({
                msg: err.message || "Some error occurred while retrieving boiler."
            });
        });
};

// Get boiler by attribute: skillsId
exports.findOneBySkillsId = (require, response) => {
    Boiler.findOneBySkillsId({ skillsId: require.params.skillsId })
        .then(data => {
            if (!data) {
                return response.status(404).send({
                    msg: `No boiler found with the skillsId ${require.params.skillsId}.`
                })
            }
            response.send(data)
        })
        .catch(err => {
            response.status(500).send({
                msg: err.message || "Some error occurred while retrieving boiler."
            });
        });
};

// Get boiler by attribute: description
exports.findOneByDescription = (require, response) => {
    Boiler.findOneByDescription({ skillsId: require.params.description })
        .then(data => {
            if (!data) {
                return response.status(404).send({
                    msg: `No boiler found with the description ${require.params.description}.`
                })
            }
            response.send(data)
        })
        .catch(err => {
            response.status(500).send({
                msg: err.message || "Some error occurred while retrieving boiler."
            });
        });
};

//Delete boiler by id
exports.delete = (require, response) => {
    const id = require.params.id;
    Boiler.findOneAndDelete({ id }, { useFindAndModify: false })
        .then(data =>
            response.send({ message: "Boiler was deleted." })
        )
        .catch(err => {
            response.status(500).send({ msg: "Error trying delete boiler with id:" + id });
        });
};

//Create new boiler
exports.create = (require, response) => {
    if (!require.body.id || !require.body.skillsId || !require.body.description) {
        return response.status(400).send({
            msg: "No field can be empty."
        })
    }
    //Create new boiler
    const boiler = new Boiler({
        id: require.body.id,
        skillsId: require.body.skillsId,
        description: require.body.description
    })
    boiler.save(boiler)
    .then(data => {
        response.send(data);
    })
    .catch(err => {
        response.status(500).send({
            msg: "Some error ocurred while creating the boiler."
        });
    });
};

//Update boiler by Id
exports.update = (require, response) => {
    if (!require.body) {
        return response.status(400).send({
            msg: "No field can be empty!"
        });
    }
    if (!require.body.id || !require.body.skillsId || !require.body.description || !require.body.stock) {
        res.status(400).send({
            msg: "Content cannot be empty!"
        });
        return;
    }
    const id = require.params.id;

    Boiler.findOneAndUpdate({ id }, require.body, { useFindAndModify: true })
        .then(data => {
            if (!data) {
                return response.status(404).send({
                    msg: `No Boiler found with the id=${id}.`
                });
            } else response.send({ msg: `The boiler data with id=${id} was modified.`});
        })
        .catch(err => {
            response.status(500).send({ msg: "An error occurred while trying to update the data"});
        });
};