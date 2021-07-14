// express dependency
const router = require('express').Router();

// routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export
module.exports = router;

