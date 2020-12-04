const buildingsRouter = require('./buildings');
const appointmentsRouter = require('./appointments');
const customersRouter = require('./customers');
var router = require('express').Router();
const techniciansRouter = require('./technicians');


// Building API Routes
router.use('/buildings', buildingsRouter);


// Technicians API Routes
router.use('/technicians', techniciansRouter);

// Customers API Routes
router.use('/customers', customersRouter);

// Appointments API Routes
router.use('/appointments', appointmentsRouter);

// Boilers-data API routes
router.use('/boilers-data', require('../controllers/boilers-data'));

// Boilers API routes
router.use('/boilers', require('../controllers/boilers'));


module.exports = router;