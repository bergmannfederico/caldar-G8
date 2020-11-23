const express = require('express');
//const uuid = require('uuid');
const router = express.Router();
const customers = require('../data/customers.json');

const idFilter = req => customer => customer.id === parseInt(req.params.id);

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

//Get Customers By Attibute


//Delete Customer By ID
router.delete('/:id', (req, res) => {
    const found = customers.some(idFilter(req));
    if (found) {
        res.json({
            msg: "Customer deleted",
            customers: customers.filter(member => !idFilter(req)(member))
        })
    } else { res.status(400).json({ msg: `No customer with the id of ${req.params.id}` }); }
})



module.exports = router;