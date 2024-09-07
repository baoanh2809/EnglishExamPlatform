const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	answers: [{
		text: { 
			type: String, 
			required: true 
		},
		isCorrectAnswer: { 
			type: Boolean, 
			required: true, 
			default: false
		},
	}],
	level: {
		type: String,
		enum: ["primarySchool", "secondarySchool", "highSchool", "IELTS", "TOEIC", "TOEFL"],
		required: true
	},
	createdBy: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'users' 
	},
	createdAt: {
		type: Date,
	},
})

module.exports = mongoose.model('questions', QuestionSchema)