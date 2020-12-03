const customer = require('../controllers/customers.js');
const router = require('express').Router();

// Retrieve all customers
router.get('/', customer.findAll);

//Create a new customers
router.post('/', customer.create);

//Retrieve a single customer by ID
router.get('/:id', customer.findOne);

//Update a customer by ID
router.put('/:id', customer.update);

//Get customer by Attribute
router.get('/attributes/customerType/:customerType', customer.findOneByAttr);
router.get('/attributes/email/:email', customer.findOneByAttr);
router.get('/attributes/fiscal_address/:fiscal_address', customer.findOneByAttr);
router.get('/attributes/buildings/:building', customer.findByAttr);

//Delete a single customer by ID
router.delete('/:id', customer.delete);

module.exports = router;