const db = require('../models');
const Customer = db.customer;

//Create and Save a new Customer
exports.create = (req, res) => {
    //Validate request
    if (!req.body.customerType || !req.body.email || !req.body.buildings || !req.body.fiscal_address) {
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
        fiscal_address: req.body.fiscal_address,
    });

    //Save Customer in the database
    customer
        .save(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while creating the Customer."
            });
        });
};

//Retrieve all Customers from Database
exports.findAll = (req, res) => {
    Customer.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving Customers"
            });
        });
};

//Find a Customer by ID
exports.findOne = (req, res) => {
    Customer.findOne({ id: req.params.id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Customer with id ${req.params.id} was not found.`
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving customer."
            });
        });
};

//Update a Customer by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            msg: "Data to update cannot to be empty!"
        });
    }

    //Validate request
    if (!req.body.customerType || !req.body.email || !req.body.buildings || !req.body.fiscal_address) {
        res.status(400).send({
            msg: "Content cannot be empty!"
        });
        return;
    }
    const id = req.params.id;

    Customer.findOneAndUpdate({ id }, req.body, { useFindAndModify: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Cannot update Customer with id=${id}. Maybe customer was not found!`
                });
            } else res.send({ msg: "Customer was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({ msg: "Error updating Customer with id=" + id });
        });
};

//Delete a Customer by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Customer.findOneAndRemove({ id }, { useFindAndModify: false })
        .then(data =>
            res.send({ message: "Customer was removed successfully." })
        )
        .catch(err => {
            res.status(500).send({ msg: "Error removing Customer with id=" + id });
        });
};

//Retrieve Customer by Attibute

//Retrieve Customers by Customer Type 
exports.findOneByAttr = (req, res) => {
    Customer.find({ customerType: req.params.customerType })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Customers with ${req.params.customerType} were not found.`
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving customers."
            });
        });
};

//Retrieve Customer by Email
exports.findOneByAttr = (req, res) => {
    Customer.find({ email: req.params.email })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Customers with ${req.params.email} were not found.`
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving customers."
            });
        });
};

//Retrieve Customer By Fiscal Address
exports.findOneByAttr = (req, res) => {
    Customer.find({ fiscal_address: req.params.fiscal_address })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Customers with ${req.params.fiscal_address} were not found.`
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving customers."
            });
        });
};


//Retrieve Customer By Building
exports.findByAttr = (req, res) => {
    Customer.find({
        buildings: parseInt(req.params.building)

    })

    .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Customers with ${req.params.buildings} were not found.`
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error occurred while retrieving customers."
            });
        });
};