const agentRouter = require('./agent');
const clientRouter = require('./client');
const botRouter = require('./bot');
const processRouter = require('./process');
const router = require('express').Router();


router.use('/agent',agentRouter);
router.use('/client',clientRouter);
router.use('/bot',botRouter);
router.use('/process',processRouter);


module.exports = router;