const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://eloy1234:eloy1234@caldar.fd9wx.mongodb.net/CaldAr?retryWrites=true&w=majority'
db.appointments = require('./appointments.js')(mongoose);

module.exports = db;