//const technicians = require('../../data/technicians.json');
//const _ = require('underscore');
const fs = require('fs');
const dataPath = './data/technicians.json';
require('slf4n-logging');
const logger = LoggerFactory.getLogger('Technicians')

// Get all technicians
exports.findAll = (req, res) =>{
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: getAllTechnicians')
        res.send(JSON.parse(data));
    });
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
exports.findOne = (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: getTechniciansById')
        const technicians = JSON.parse(data);
        const found = technicians.some(technician => technician.id === parseInt(req.params.id));
        if(found){
            logger.info(`Returning technician with ID equal to ${req.params.id}`);
            return res.json(technicians.filter(technician => technician.id === parseInt(req.params.id)));
        }
        logger.error(`Not technician found with ID ${req.params.id}`);
        res.status(400).json({msg: `No technicians found with id  ${req.params.id}`});
    });
};

/*
router.get('/id/:id', (req, res) => {
    const {id} = req.params;
    _.each(technicians, (technicians, i) => {
        if (technicians.id == id){
            res.send(technicians)
        }
    })
    res.status(400).json({msg: `No technicians found whit id: ${req.params.id}`})
})

// deleteTechnicianById
router.delete('/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const techs = JSON.parse(data);
        const found = techs.some(technician => technician.id === parseInt(req.params.id));
        if(found){
            const newJson = techs.filter(technician => technician.id !== parseInt(req.params.id));
            fs.writeFile(dataPath, JSON.stringify(newJson), 'utf8', function(err) {
                if (err)
                    return res.status(500).json({msg: 'Imposible to re-write the technician'});
                return res.json(newJson)
            });
        }
    });
})
*/
