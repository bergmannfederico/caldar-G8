const buildingsRouter = require('./buildings');
const customersRouter = require('./customers');
var router = require('express').Router();


// Building API Routes
router.use('/buildings', buildingsRouter);
router.use('/customers', customersRouter);

module.exports = router;