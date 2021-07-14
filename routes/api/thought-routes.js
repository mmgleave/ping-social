// express dependency
const router = require('express').Router();

// thought routes
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// get all and post ('api/thoughts')
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// get one, put, and delete ('api/thoughts:id')
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// reaction post ('api/thoughts/:id/reactions')
router    
    .route('/:id/reactions')
    .post(createReaction);

// reaction post delete ('api/thoughts/:id/reactions/:reactionId')
router
    .route('/:id/reactions/:reactionId')
    .delete(deleteReaction);

// export
module.exports = router;