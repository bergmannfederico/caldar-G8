const express = require('express');
//const uuid = require('uuid'); to update and create 
const router = express.Router();
const customers = require('../data/customers.json');

const idFilter = req => customer => customer.id === parseInt(req.params.id);
const typeFilter = req => customer => customer.customerType === req.params.customerType;
const emailFilter = req => customer => customer.email === req.params.email;
const addressFilter = req => customer => customer.fiscal_address === req.params.fiscal_address;
const buildingFilter = req => customer => customer.buildings === req.params.buildings;


//Get All Customers
router.get('/', (req, res) => {
    res.json(customers)
});

//Get Customer By ID
router.get('/:id', (req, res) => {

    const found = customers.some(idFilter(req));

    if (found) {
        res.json(customers.filter(idFilter(req)));
    } else {
        res.status(400).json({ msg: `No customer with the id of ${req.params.id}` });
    }
});

//Get Customers By Attribute
//By Customer Type
router.get('/attributes/customerType/:customerType', (req, res) => {

    const found = customers.some(typeFilter(req));
    if (found) {
        res.json(customers.filter(typeFilter(req)));
    } else {
        res.status(400).json({ msg: `No customer with the customer type of ${req.params.customerType}` });
    }
})

//By Email
router.get('/attributes/email/:email', (req, res) => {

    const found = customers.some(emailFilter(req));
    if (found) {
        res.json(customers.filter(emailFilter(req)));
    } else {
        res.status(400).json({ msg: `No customer with the email of ${req.params.email}` });
    }
})

//By Fiscal Address
router.get('/attributes/fiscal_address/:fiscal_address', (req, res) => {

    const found = customers.some(addressFilter(req));
    if (found) {
        res.json(customers.filter(addressFilter(req)));
    } else {
        res.status(400).json({ msg: `No customer with the fiscal address of ${req.params.fiscal_address}` });
    }
})

//By Buildings 
//I keep looking for the solution
router.get('/attributes/buildings/:id', (req, res) => {

    const found = customers.some(buildingFilter(req));
    if (found) {
        res.json(customers.filter(buildingFilter(req)));
    } else {
        res.status(400).json({ msg: `No customer with the building of id ${req.params.buildings}` });
    }

})


//Delete Customer By ID
router.delete('/:id', (req, res) => {
    const found = customers.some(idFilter(req));
    if (found) {
        res.json({
            msg: "Customer deleted",
            customers: customers.filter(customer => !idFilter(req)(customer))
        })
    } else {
        res.status(400).json({ msg: `No customer with the id of ${req.params.id}` });
    }
})
module.exports = router;