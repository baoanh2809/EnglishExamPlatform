const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
		type:String,
		required: true,
		unique: true
	},
	password: { 
		type: String,
		required: true
	},
	fullname: {
		type: String,
		require: true
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
	createdAt: {
		type: Date,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;