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
/*
// getTechnicianById
router.get('/id/:id', (req, res) => {
    const {id} = req.params;
    _.each(technicians, (technicians, i) => {
        if (technicians.id == id){
            res.send(technicians)
        }
    })
    res.status(400).json({msg: `No technicians found whit id: ${req.params.id}`})
})
// getTechniciansByAttribute(first_name)
router.get('/first_name/:first_name', (req, res) => {
    const {first_name} = req.params;
    _.each(technicians, (technicians, i) => {
        if (technicians.first_name == first_name){
            res.send(technicians)
        }
        
    })
    res.status(400).json({msg: `No technicians found whit first name: ${req.params.first_name}`})
})
// getTechniciansByAttribute(last_name)
router.get('/last_name/:last_name', (req, res) => {
    const {last_name} = req.params;
    _.each(technicians, (technicians, i) => {
        if (technicians.last_name == last_name){
            res.send(technicians)
        }
        
    })
    res.status(400).json({msg: `No technicians found whit last name: ${req.params.last_name}`})
})
// getTechniciansByAttribute(email)
router.get('/email/:email', (req, res) => {
    const {email} = req.params;
    _.each(technicians, (technicians, i) => {
        if (technicians.email == email){
            res.send(technicians)
        }
        
    })
    res.status(400).json({msg: `No technicians found whit email: ${req.params.email}`})
})
// getTechniciansByAttribute(typeIds)
router.get('/typeIds/:typeIds', (req, res) => {
    const {typeIds} = req.params;
    _.each(technicians, (technicians, i) => {
        if (technicians.typeIds == typeIds){
            res.send(technicians)
        }
        
    })
    res.status(400).json({msg: `No technicians found whit typeIds: ${req.params.typeIds}`})
})
// getTechniciansByAttribute(skillsId)
router.get('/skillsId/:skillsId', (req, res) => {
    const {skillsId} = req.params;
    _.each(technicians, (technicians, i) => {
        if (technicians.skillsId == skillsId){
            res.send(technicians)
        }
        
    })
    res.status(400).json({msg: `No technicians found whit skillsId: ${req.params.skillsId}`})
})
// getTechniciansByAttribute(hour_rate)
router.get('/hour_rate/:hour_rate', (req, res) => {
    const {hour_rate} = req.params;
    _.each(technicians, (technicians, i) => {
        if (technicians.hour_rate == hour_rate){
            res.send(technicians)
        }
        
    })
    res.status(400).json({msg: `No technicians found whit hour rate: ${req.params.hour_rate}`})
})
// getTechniciansByAttribute(daily_capacity)
router.get('/daily_capacity/:daily_capacity', (req, res) => {
    const {daily_capacity} = req.params;
    _.each(technicians, (technicians, i) => {
        if (technicians.daily_capacity == daily_capacity){
            res.send(technicians)
        }
        
    })
    res.status(400).json({msg: `No technicians found whit daily capacity: ${req.params.daily_capacity}`})
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
