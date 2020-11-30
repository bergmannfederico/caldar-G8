const router = require('express').Router();
const buildingsRouter = require('./buildings');
const boilersRouter = require('./boilers');
const boilersDataRouter = require('./boilers-data');


// Building API Routes
router.use('/buildings', buildingsRouter);

// Technicians API Routes
router.use('/technicians', require('../controllers/technicians'));

// Customers API Routes
router.use('/customers', require('../controllers/customers'));

// Appointments API Routes
router.use('/appointments', require('../controllers/appointments'));

// Boilers-data API routes
router.use('/boilers-data', boilersDataRouter);

// Boilers API routes
router.use('/boilers', boilersRouter);

module.exports = router;