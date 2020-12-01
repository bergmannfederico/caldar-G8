const customer = require('../controllers/customers.js');
const router = require('express').Router();

// Retrieve all customers
router.get('/', customer.findAll);

//Create a new customers
router.post('/', customer.create);

//Retrieve a single customer by ID
router.get('/:id', customer.findOne);

//Update a customer by ID
router.get('/:id', customer.update);

//Get customer by Attribute
router.get('/attributes', customer.findOneByAttr);

//Delete a single customer by ID
router.delete('/:id', customer.delete);

module.exports = router;