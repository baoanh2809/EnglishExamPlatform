const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EnrolledExamSchema = new Schema({
	examID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'exam',
		required: true
	},
	studentID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	answers: [{ 
		type: String,
	}],
  	score: { 
		type: Number, 
		default : 0
	},
  	startTime: { 
		type: Date, 
		default: Date.now 
	},
	completed: { 
		type: Boolean,
		required: true,
		defaut: false
	},

})

module.exports = mongoose.model('enrolledExam', EnrolledExamSchema)