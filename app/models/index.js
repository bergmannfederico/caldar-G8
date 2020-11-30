const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://admin:admin@cluster0.mekob.mongodb.net/CaldAR?retryWrites=true&w=majority';
db.appointments = require('./appointments.js')(mongoose);


module.exports = db;