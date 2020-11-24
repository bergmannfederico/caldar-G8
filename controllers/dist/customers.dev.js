"use strict";

var express = require('express'); //const uuid = require('uuid'); to update and create 


var router = express.Router();

var customers = require('../data/customers.json');

var idFilter = function idFilter(req) {
  return function (customer) {
    return customer.id === parseInt(req.params.id);
  };
};

var typeFilter = function typeFilter(req) {
  return function (customer) {
    return customer.customerType === req.params.customerType;
  };
};

var emailFilter = function emailFilter(req) {
  return function (customer) {
    return customer.email === req.params.email;
  };
};

var addressFilter = function addressFilter(req) {
  return function (customer) {
    return customer.fiscal_address === req.params.fiscal_address;
  };
};

var buildingFilter = function buildingFilter(req) {
  return function (customer) {
    return customer.buildings === req.params.buildings;
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
}); //Get Customers By Attribute
//By Customer Type

router.get('/attributes/customerType/:customerType', function (req, res) {
  var found = customers.some(typeFilter(req));

  if (found) {
    res.json(customers.filter(typeFilter(req)));
  } else {
    res.status(400).json({
      msg: "No customer with the customer type of ".concat(req.params.customerType)
    });
  }
}); //By Email

router.get('/attributes/email/:email', function (req, res) {
  var found = customers.some(emailFilter(req));

  if (found) {
    res.json(customers.filter(emailFilter(req)));
  } else {
    res.status(400).json({
      msg: "No customer with the email of ".concat(req.params.email)
    });
  }
}); //By Fiscal Address

router.get('/attributes/fiscal_address/:fiscal_address', function (req, res) {
  var found = customers.some(addressFilter(req));

  if (found) {
    res.json(customers.filter(addressFilter(req)));
  } else {
    res.status(400).json({
      msg: "No customer with the fiscal address of ".concat(req.params.fiscal_address)
    });
  }
}); //By Buildings 
//I keep looking for the solution

router.get('/attributes/buildings/:id', function (req, res) {
  var found = customers.some(buildingFilter(req));

  if (found) {
    res.json(customers.filter(buildingFilter(req)));
  } else {
    res.status(400).json({
      msg: "No customer with the building of id ".concat(req.params.buildings)
    });
  }
}); //Delete Customer By ID

router["delete"]('/:id', function (req, res) {
  var found = customers.some(idFilter(req));

  if (found) {
    res.json({
      msg: "Customer deleted",
      customers: customers.filter(function (customer) {
        return !idFilter(req)(customer);
      })
    });
  } else {
    res.status(400).json({
      msg: "No customer with the id of ".concat(req.params.id)
    });
  }
});
module.exports = router;