// thought model
const { Thought, User } = require('../models');

// thought controller
const thoughtController = {
    // get all
    getAllThoughts(req, res) {
        Thought
            .find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // get one by id
    getThoughtById({ params }, res) {
        Thought
            .findOne({ _id: params.id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // create
    createThought({ body }, res) {
        Thought
            .create(body)
            .then(({ _id }) => {
                return User
                    .findOneAndUpdate(
                        { username: body.username },
                        { $push: { thoughts: _id }},
                        { new: true }
                    );
            })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Thought creation not successful'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // update by id
    updateThought({ params, body }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true }
            )
            .then(dbThoughtData => {
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // delete by id
    deleteThought({ params }, res) {
        Thought
            .findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                console.log(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // create reaction
    createReaction({ params, body }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.id },
                { $addToSet: { reactions: body }},
                { new: true }
            )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Reaction creation not successful'});
                    return;
                }
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // delete reaction
    deleteReaction({ params }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.id },
                { $pull: { reactions: { reactionId: params.reactionId }}},
                { new: true }
            )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id'});
                    return;
                }
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    }
};

// export
module.exports = thoughtController;