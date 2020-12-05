const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://admin:admin@cluster0.mekob.mongodb.net/CaldAR?retryWrites=true&w=majority';
db.customer = require('./customers.js')(mongoose);
db.building = require('./buildings.js')(mongoose);
db.technicians = require('./technicians')(mongoose);
db.appointments = require('./appointments.js')(mongoose);

module.exports = db;