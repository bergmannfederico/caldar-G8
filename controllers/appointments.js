const express = require('express');
const fs = require('fs');
let appointmentsData = JSON.parse(fs.readFileSync('./data/appointments.json'));

console.log(appointmentsData);