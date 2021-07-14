// mongoose dependency
const { Schema, model } = require('mongoose');

// user schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'username is required',
            trim: true
        },
        email: {
            type: String,
            required: 'email is required',
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address.'
			]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
		toJSON: {
			virtuals: true,
		},
	}
);

// virtual for count of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// user model
const User = model('User', UserSchema);

// export
module.exports = User;