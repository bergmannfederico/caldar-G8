const db = require('../models');
const Customer = db.customer;

//Create and Save a new Customer
exports.create = (req, res) => {
    //Validate request
    if (!req.body.customerType || !req.body.email || !req.body.buildings || !req.body.fiscalAddress) {
        res.status(400).send({
            msg: "Content cannot be empty!"
        });
        return;
    }

    //Create a Customer
    const customer = new Customer({
        id: req.body.id,
        customerType: req.body.customerType,
        email: req.body.email,
        building: req.body.buildings,
        fiscalAddress: req.body.fiscalAddress,
    });

    //Save Customer in the database
    customer
        .save(customer)
        .then(data => {
            res.send(data)
        })
        .cath(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while creating the Customer"
            });
        });
};

//Retrieve all Customers from database
exports.findAll = (req, res) => {
    Customer.find({})
        .then(data => {
            res.send(data);
        })
        .catcher(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving Customers"
            });
        });
};