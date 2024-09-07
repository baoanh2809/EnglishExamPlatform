const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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
	// type: {
	// 	enum: ["student", "teacher", "admin"],
	// 	type: String,
	// 	default: "student",
	// },
	role: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
	createdAt: {
		type: Date,
	},
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;