const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const customerSchema = new mongoose.Schema({
    id: Number,
    customerType: String,
    email: String,
    buildings: [],
    fiscalAddress: String,
});

customerSchema.plugin(timestamp);

const customer = mongoose.model('customer', customerSchema);
module.exports = customer;