const fs = require('fs');
const dataPath = './data/appointments.json';
require('slf4n-logging');
const logger = LoggerFactory.getLogger('Appointments')


// Get all appointments
exports.findAll = (req, res) =>{
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: getAppointments');
        res.json(JSON.parse(data));
    });
};

// Get appointments by Attribute
exports.findOneByAttr = (req, res) =>{
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: getAppointmentByAttr');
        let appointmentsData = JSON.parse(fs.readFileSync(dataPath));
        let filterData = appointmentsData; 
        let flag_filter = false;
        if(req.query.id){
            filterData = filterData.filter(appointment => appointment.id === parseInt(req.query.id));
            flag_filter = true;
        }
        if(req.query.buildingId){
            filterData = filterData.filter(appointment => appointment.buildingId === parseInt(req.query.buildingId));
            flag_filter = true;
        }
        if(req.query.boilerId){
            filterData = filterData.filter(appointment => appointment.boilerId === parseInt(req.query.boilerId));
            flag_filter = true;
        }
        if(req.query.start_timestamp){
            filterData = filterData.filter(appointment => appointment.start_timestamp === String(req.query.start_timestamp));
            flag_filter = true;
        }
        if(req.query.end_timestamp){
            filterData = filterData.filter(appointment => appointment.end_timestamp === String(req.query.end_timestamp));
            flag_filter = true;
        }
        
        if(flag_filter){
            logger.info(`Returning appointment successfully`);
            return res.json(filterData);
        }else{
            logger.error(`The attr send on the URL is not compatible with appointment`);
            return res.status(400).json({msg: `Attribute incompatible with appointment`});
        }
    });
};


// Get appointment by ID
exports.findOne = (req, res) =>{
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let appointmentsData = JSON.parse(fs.readFileSync(dataPath));
        const found = appointmentsData.some(appointment => appointment.id === parseInt(req.params.id));

        logger.info('Endpoint called: getAppointmentById')
    
        if (found){
            logger.info(`Returning appointment with ID equal to ${req.params.id}`);
            return res.json(appointmentsData.filter(appointment => appointment.id === parseInt(req.params.id))); 
        }else{
            logger.error(`No appointment found with ID ${req.params.id}`);
            return res.status(400).json({msg: `No appointment found with ID ${req.params.id}`});
        }
    });
};


// Delete appointment by ID
exports.delete = (req, res) =>{
    fs.readFile(dataPath, 'utf8', (err, data) => {
        logger.info('Endpoint called: deleteAppointmentById');        
        let appointmentsData = JSON.parse(fs.readFileSync(dataPath));
        const found = appointmentsData.some(appointment => appointment.id === parseInt(req.params.id));
        if (found){
            logger.info(`Deleting appointment with ID equal to ${req.params.id}`);
            const newJson = appointmentsData.filter(appointment => appointment.id !== parseInt(req.params.id));
            fs.writeFile(dataPath, JSON.stringify(newJson), 'utf8', function(err) {
                if (err) {
                    logger.error(`error trying to write ${dataPath}`);
                    return res.status(500).json({msg: 'Imposible to re-write the appointments'});
                }
                return res.json(newJson);
            
            });
        }else{
            logger.error(`No appointment found with ID ${req.params.id} to delete`);
            return res.status(400).json({msg: `No appointments found whit id: ${req.params.id}`});            
        }
    });
};
