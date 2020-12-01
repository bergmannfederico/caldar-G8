//const technicians = require('../../data/technicians.json');
//const _ = require('underscore');
const fs = require('fs');
const dataPath = './data/technicians.json';
require('slf4n-logging');
const logger = LoggerFactory.getLogger('Technicians')

const db = require('../models');
const Technicians = db.technicians;

// Get all technicians
exports.findAll = (req, res) =>{
    Technicians.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || `An error ocurred trying to get all technicians`
            })
        })
};


// Get technicians by Attribute
exports.findOneByAttr = (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: getTechniciansByAttr');
        const technicians = JSON.parse(data);
        if(req.query.first_name){
            logger.info(`Returning technicians with first name equal to ${req.query.first_name}`);
            return res.json(technicians.filter(technician => technician.first_name === req.query.first_name));
        }else if(req.query.last_name){
            logger.info(`Returning technicians with attribute last_name equal to ${req.query.last_name}`);
            return res.json(technicians.filter(technician => technician.last_name === req.query.last_name));
        }else if(req.query.email){
            logger.info(`Returning technicians with attribute email equal to ${req.query.email}`);
            return res.json(technicians.filter(technician => technician.email === req.query.email));
        }else if(req.query.hour_rate){
            logger.info(`Returning technicians with attribute hour rate equal to ${req.query.hour_rate}`);
            return res.json(technicians.filter(technician => technician.hour_rate === req.query.hour_rate));
        }else if(req.query.daily_capacity){
            logger.info(`Returning technicians with attribute daily capacity equal to ${req.query.daily_capacity}`);
            return res.json(technicians.filter(technician => technician.daily_capacity === req.query.daily_capacity));
        }else if(req.query.typeIds){
            logger.info(`Returning technicians with attribute typeIds equal to ${req.query.typeIds}`);
            return res.json(technicians.filter(technician =>
                technician.typeIds.includes(parseInt(req.query.typeIds))));
        }else if(req.query.skillsId){
            logger.info(`Returning technicians with attribute skillsId equal to ${req.query.skillsId}`);
            return res.json(technicians.filter(technician =>
                technician.skillsId.includes(parseInt(req.query.skillsId))));
        }else{
            logger.error(`The attr send on the URL is not compatible with technicians`);
            res.status(400).json({msg: `Attribute incompatible with technicians`})
        }
        return res.json('');
    });
};

//Get technicians by ID
exports.findOne = (req, res) =>{
    Technicians.findOne({id: req.params.id})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: `Technician with id ${req.params.id} was not found`
                });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `An error ocurred trying to get technician with id ${req.params.id} `
            })
        })
};

//Delete technicians
exports.delete = (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: deleteTechnicianById')
        const technicians = JSON.parse(data);
        const found = technicians.some(technician => technician.id === parseInt(req.params.id));
        if(found){
            logger.info(`Deleting technician with ID equal to ${req.params.id}`);
            const newJson = technicians.filter(technician => technician.id !== parseInt(req.params.id));
            fs.writeFile(dataPath, JSON.stringify(newJson), 'utf8', function(err) {
                if (err) {
                    logger.error(`error trying to write ${dataPath}`);
                    return res.status(500).json({msg: 'Imposible to re-write technicians'});
                }
                return res.json(newJson)
            });
        }
        logger.error(`No technician found with ID ${req.params.id} to delete`);
        res.status(400).json({msg: `No technicians found whit id: ${req.params.id}`})
    });
};

