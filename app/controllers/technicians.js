require('slf4n-logging');
// eslint-disable-next-line no-undef
const logger = LoggerFactory.getLogger('Technicians');
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
//Get technicians by Attribute
exports.findByAttr = (req, res) => {
    if(!(req.query.first_name || req.query.last_name || req.query.email || req.query.typeIds || req.query.skillsId || req.query.hour_rate || req.query.daily_capacity)){
        logger.error(`The attribute send on the URL is not compatible with technicians`);
        return res.status(400).json({msg: `The attribute is incompatible with technicians`})
    }
    if(req.query.typeIds){
        req.query.typeIds = parseInt(req.query.typeIds);
    }
    if(req.query.skillsId){
        req.query.skillsId = parseInt(req.query.skillsId);
    }
    logger.info('Endpoint called: getAllTechnicians')
    Technicians.find(req.query)
        .then(data => {
            if(!data){
                return res.send('');
            }
            logger.info(`Returning technician with attr equal to ${req.params.id}`);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving technicians'
            });
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
//Create a new technician
exports.create = (req, res) => {
    logger.info('Endpoint called: createTechnician');
    if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.typeIds || !req.body.skillsId || !req.body.hour_rate || !req.body.daily_capacity || !req.body.id){
        return res.status(400).send({message: 'Specify all attributes to create a new technician'});
    }
    // Create new technician object
    const technician = new Technicians({
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        typeIds: req.body.typeIds,
        skillsId: req.body.skillsId,
        hour_rate: req.body.hour_rate,
        daily_capacity: req.body.daily_capacity
    });
    technician.save(technician)
        .then(data => {
            logger.info(`Creating technician with ID  ${req.body.id}`);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating technicians'
            });
        });
};
//Update technician by ID
exports.update = (req, res) => {
    logger.info('Endpoint called: updateTechnician')
    if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.typeIds || !req.body.skillsId || !req.body.hour_rate || !req.body.daily_capacity || !req.body.id){
        return res.status(400).send({message: 'Specify all attributes to update a technician'});
    }
    const id = req.params.id;
    Technicians.findOneAndUpdate({id}, req.body, { useFindAndModify: true })
        .then(data => {
            if(!data){
                logger.error(`No technicians found with ID ${req.params.id}`);
                return res.status(404).send({
                    message: `No technicians found with id  ${req.params.id}`
                });
            }
            logger.info(`Updating technicians with ID equal to ${req.params.id}`);
            res.send({ message: 'technicians updated' });
        })
        .catch(() => {
            res.status(500).send({
                message: 'Error occurred while updating technicians'
            });
        });
};
//Delete technicians
exports.delete = (req, res) => {
    logger.info('Endpoint called: deleteTechnicianById');
    const id = req.params.id;
    Technicians.findOneAndDelete({id}, {useFindAndModify: false})
        .then(() => {
            logger.info(`Deleting s with ID equal to ${req.params.id}`);
            res.send({message: 'Technician removed'})
        })
        .catch(() => {
            logger.error(`Error trying to delete technician with ID=` + id);
            return res.status(500).json({message: 'Error trying to delete technician with ID=' + id});
        });
};


