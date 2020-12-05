var router = require('express').Router();
const buildingsRouter = require('./buildings');
const boilersRouter = require('./boilers');
const boilersDataRouter = require('./boilers-data');
const appointmentsRouter = require('./appointments');
const customersRouter = require('./customers');
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
router.use('/boilers-data', boilersDataRouter);

// Boilers API routes
router.use('/boilers', boilersRouter);


module.exports = router;