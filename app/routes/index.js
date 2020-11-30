const router = require('express').Router();
const buildingsRouter = require('./buildings');



// Building API Routes
router.use('/buildings', buildingsRouter);

// Technicians API Routes
router.use('/technicians', require('../controllers/technicians'));

// Customers API Routes
router.use('/customers', require('../controllers/customers'));

// Appointments API Routes
router.use('/appointments', require('../controllers/appointments'));

// Boilers-data API routes
router.use('/boilers-data', require('../controllers/boilers-data'));

// Boilers API routes
router.use('/boilers', require('../controllers/boilers'));

module.exports = router;