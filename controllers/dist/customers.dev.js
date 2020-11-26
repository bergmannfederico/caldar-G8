"use strict";

var express = require('express');

var router = express.Router();

var customers = require('../data/customers.json');

var idFilter = function idFilter(req) {
  return function (customer) {
    return customer.id === parseInt(req.params.id);
  };
}; //Get All Customers


router.get('/', function (req, res) {
  res.json(customers);
}); //Get Customer By ID

router.get('/:id', function (req, res) {
  var found = customers.some(idFilter(req));

  if (found) {
    res.json(customers.filter(idFilter(req)));
  } else {
    res.status(400).json({
      msg: "No customer with the id of ".concat(req.params.id)
    });
  }
});
module.exports = router;