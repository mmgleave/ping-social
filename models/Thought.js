// mongoose dependency
const { Schema, model } = require('mongoose');

// thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'thought text is required',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'username is required'
        },
        reactions: [
            
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// virtual to get reaction count
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

// thought model
const Thought = model('Thought', ThoughtSchema)

// export
module.exports = Thought