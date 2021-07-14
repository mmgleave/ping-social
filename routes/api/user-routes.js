// express dependency
const router = require('express').Router();

// user routes
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// get all and post ('/api/users')
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// get one, put, and delete ('/api/users/:id')
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// friends add and delete ('/api/users/:id/friends/:friendId')
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

// export
module.exports = router;