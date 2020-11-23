"use strict";

var express = require('express'); //const uuid = require('uuid');


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
}); //Get Customers By Attibute
//Delete Customer By ID

router["delete"]('/:id', function (req, res) {
  var found = customers.some(idFilter(req));

  if (found) {
    res.json({
      msg: "Customer deleted",
      customers: customers.filter(function (member) {
        return !idFilter(req)(member);
      })
    });
  } else {
    res.status(400).json({
      msg: "No customer with the id of ".concat(req.params.id)
    });
  }
});
module.exports = router;