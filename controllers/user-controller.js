// user model
const { User } = require('../models');

// user controllers
const userController = {
    // get all
    getAllUsers(req, res) {
        User
            .find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // get one by id
    getUserById({ params }, res) {
        User
            .findOne({ _id: params.id })
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData = > res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // create
    createUser({ body }, res) {
        User
            .create(body)
            .then(dbUserData = > res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // update by id
    updateUser({ params, body}, res) {
        User
            .findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // delete by id
    deleteUser({ params }, res) {
        User
            .findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // add friend to user
    addFriend({ params }, res) {
        User
            .findOneAndUpdate(
                { _id: params.id },
                { $addToSet: { friends: params.friendId }},
                { new: true }
            )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // delete friend from user
    deleteFriend({ params }, res) {
        User
            .findOneAndUpdate(
                { _id: params.id },
                { $pull: { friends: params.friendId }},
                { new: true }
            )
            ..then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    }
};

// export
module.exports = userController;