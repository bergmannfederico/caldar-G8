const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.url = ''
db.appointments = require('./appointments.js')(mongoose);

module.exports = db;