// mongoose dependency
const { Schema, Types } = require('mongoose');

// date formatting
const dateFormat = require('../utils/dateFormat');

// reaction schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'reaction body is required',
            maxLength: 280
        },
        username: {
            type: String,
            required: 'username is required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// export
module.exports = ReactionSchema;