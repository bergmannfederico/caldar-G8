const db = require('../models');
const Building = db.building;
require('slf4n-logging');
const logger = LoggerFactory.getLogger('Buildings')

// Get all buildings
exports.findAll = (req, res) =>{
    logger.info('Endpoint called: getAllBuildings')
    Building.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error(err.message);
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving buildings'
            });
        });
};

//Get building by Attribute
exports.findByAttr = (req, res) => {
    if(!(req.query.address || req.query.fullName || req.query.phone || req.query.boilerId)){
        logger.error(`The attr send on the URL is not compatible with buildings`);
        return res.status(400).json({msg: `Attribute incompatible with buildings`})
    }
    if(req.query.boilerId){
        req.query.boilerId = parseInt(req.query.boilerId);
    }
    logger.info('Endpoint called: getAllBuildings')
    Building.find(req.query)
        .then(data => {
            if(!data){
                return res.send('');
            }
            logger.info(`Returning building with attr equal to ${req.params.id}`);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving buildings'
            });
        });
};

//Get building by ID
exports.findOne = (req, res) => {
    logger.info('Endpoint called: getBuildingById')
    Building.findOne({id: req.params.id})
        .then(data => {
            if(!data){
                logger.error(`No building found with ID ${req.params.id}`);
                return res.status(404).send({
                    message: `No buildings found with id  ${req.params.id}`
                });
            }
            logger.info(`Returning building with ID equal to ${req.params.id}`);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving buildings'
            });
        });
};

//Delete building
exports.delete = (req, res) => {
    logger.info('Endpoint called: deleteBuildingById');
    const id = req.params.id;
    Building.findOneAndDelete({id}, {useFindAndModify: false})
        .then(() => {
            logger.info(`Deleting building with ID equal to ${req.params.id}`);
            res.send({message: 'Building removed'})
        })
        .catch(() => {
            logger.error(`Error trying to delete building with ID=` + id);
            return res.status(500).json({message: 'Error trying to delete building with ID=' + id});
        });
};

//Create a new building
exports.create = (req, res) => {
    logger.info('Endpoint called: createBuilding');
    if(!req.body.address || !req.body.fullName || !req.body.phone || !req.body.boilerId || !req.body.id){
        return res.status(400).send({message: 'Specify all attributes to create a new building'});
    }

    // Create the building object
    const building = new Building({
        id: req.body.id,
        fullName: req.body.fullName,
        address: req.body.address,
        phone: req.body.phone,
        boilerId: req.body.boilerId
    });

    building.save(building)
        .then(data => {
            logger.info(`Creating building with ID  ${req.body.id}`);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating buildings'
            });
        });
};

//Update building by ID
exports.update = (req, res) => {
    logger.info('Endpoint called: updateBuilding')
    if(!req.body.address || !req.body.fullName || !req.body.phone || !req.body.boilerId || !req.body.id){
        return res.status(400).send({message: 'Specify all attributes to update a building'});
    }

    const id = req.params.id;

    Building.findOneAndUpdate({id}, req.body, { useFindAndModify: true })
        .then(data => {
            if(!data){
                logger.error(`No building found with ID ${req.params.id}`);
                return res.status(404).send({
                    message: `No buildings found with id  ${req.params.id}`
                });
            }
            logger.info(`Updating building with ID equal to ${req.params.id}`);
            res.send({ message: 'Building updated' });
        })
        .catch(() => {
            res.status(500).send({
                message: 'Error occurred while updating buildings'
            });
        });
};