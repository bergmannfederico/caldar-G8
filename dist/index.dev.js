"use strict";

var express = require("express");

var path = require("path");

var customers = require("./data/customers.json");

var app = express(); //BodyParser

app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); //Customers API Routes

app.use('/customers', require('./controllers/customers.js'));
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server started on port ".concat(PORT));
});