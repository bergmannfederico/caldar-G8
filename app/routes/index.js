const buildingsRouter = require('./buildings');
const customersRouter = require('./customers');
var router = require('express').Router();
const techniciansRouter = require('./technicians');


// Building API Routes
router.use('/buildings', buildingsRouter);
router.use('/customers', customersRouter);

// Technicians API Routes
router.use('/technicians', techniciansRouter);

// Customers API Routes
router.use('/customers', require('../controllers/customers'));

// Appointments API Routes
router.use('/appointments', require('../controllers/appointments'));

// Boilers-data API routes
router.use('/boilers-data', require('../controllers/boilers-data'));

// Boilers API routes
router.use('/boilers', require('../controllers/boilers'));


module.exports = router;