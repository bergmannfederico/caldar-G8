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

//Retrieve all Customers from Database
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

//Find a Customer by ID
exports.FindOne = (req, res) => {
    Customer.FindOne({ id: req.params.id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Customer with id ${req.params.id} was not found.`
                })
            }
            res.send(data)
        })
        .catcher(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving building."
            });
        });
}

//Update a Customer by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            msg: "Data to update cannot to be empty!"
        });
    }

    //Validate request
    if (!req.body.customerType || !req.body.email || !req.body.buildings || !req.body.fiscalAddress) {
        res.status(400).send({
            msg: "Content cannot be empty!"
        });
        return;
    }
    const id = req.params.id;

    Customer.findOneandUpdate({ id }, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Cannot update Customer with id=${id}. Maybe customer was not found!`
                });
            } else res.send({ msg: "Customer was updated successfully." });
        })
        .catcher(err => {
            res.status(500).send({ msg: "Error updating Customer with id=" + id });
        });
};

//Delete a Customer by ID
exports.delete = (req, res) => {
    const id = rq.params.id;
    Customer.findOneAndRemove({ id }, { useFindAndModify: false })
        .then(data =>
            res.send({ message: "Customer was removed successfully." })
        )
        .catcher(err => {
            res.status(500).send({ msg: "Error removing Customer with id=" + id });
        });
};

//Retrieve Customer by Attibute
//Retrieve Customers by Customer Type 

exports.FindAll = (req, res) => {
    Customer.FindAll({ id: req.params.customerType })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Customer with id ${req.params.customerType} was not found.`
                })
            }
            res.send(data)
        })
        .catcher(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving building."
            });
        });
}

//Retrieve Custome by Email

//Retrieve Custome by Email