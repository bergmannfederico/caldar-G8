const express = require('express');
const router = express.Router();
const fs = require('fs');
const dataPath = './data/buildings.json';
require('slf4n-logging');
const logger = LoggerFactory.getLogger('Buildings')

// Get all buildings
router.get('/', (req, res) =>{
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: getAllBuildings')
        res.send(JSON.parse(data));
    });
});

//Get building by Attribute
router.get('/attributes', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: getBuildingByAttr');
        const buildings = JSON.parse(data);
        if(req.query.address){
            logger.info(`Returning buildings with attribute address equal to ${req.query.address}`);
            return res.json(buildings.filter(building => building.address === req.query.address));
        }else if(req.query.full_name){
            logger.info(`Returning buildings with attribute full name equal to ${req.query.full_name}`);
            return res.json(buildings.filter(building => building.full_name === req.query.full_name));
        }else if(req.query.phone){
            logger.info(`Returning buildings with attribute phone equal to ${req.query.phone}`);
            return res.json(buildings.filter(building => building.phone === req.query.phone));
        }else if(req.query.boiler_id){
            logger.info(`Returning buildings with attribute boiler_id equal to ${req.query.boiler_id}`);
            return res.json(buildings.filter(building =>
                building.boiler_id.includes(parseInt(req.query.boiler_id))));
        }else{
            logger.error(`The attr send on the URL is not compatible with buildings`);
            res.status(400).json({msg: `Attribute incompatible with buildings`})
        }
        return res.json('');
    });
});

//Get building by ID
router.get('/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: getBuildingById')
        const buildings = JSON.parse(data);
        const found = buildings.some(building => building.id === parseInt(req.params.id));

        if(found){
            logger.info(`Returning building with ID equal to ${req.params.id}`);
            return res.json(buildings.filter(building => building.id === parseInt(req.params.id)));
        }
        logger.error(`No building found with ID ${req.params.id}`);
        res.status(400).json({msg: `No buildings found with id  ${req.params.id}`});
    });
});

//Delete building
router.delete('/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: deleteBuildingById')
        const buildings = JSON.parse(data);
        const found = buildings.some(building => building.id === parseInt(req.params.id));
        if(found){
            logger.info(`Deleting building with ID equal to ${req.params.id}`);
            const newJson = buildings.filter(building => building.id !== parseInt(req.params.id));
            fs.writeFile(dataPath, JSON.stringify(newJson), 'utf8', function(err) {
                if (err) {
                    logger.error(`error trying to write ${dataPath}`);
                    return res.status(500).json({msg: 'Imposible to re-write the buildings'});
                }
                return res.json(newJson)
            });
        }
        logger.error(`No building found with ID ${req.params.id} to delete`);
        res.status(400).json({msg: `No buildings found whit id: ${req.params.id}`})
    });
});

module.exports = router;