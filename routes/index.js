// express dependency
const router = require('express').Router();

// api routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// export
module.exports = router;