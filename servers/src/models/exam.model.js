const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExamSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	level: {
		type: String,
		required: true
	},
	questions: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'questions' 
	}],
	duration: { //duration in minutes
		type: Number, 
		required: true
	},
  	createdBy: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'users' 
	},
	user_tests: {
		type: Number,
		default: 0
	},
	user_views: {
		type: Number,
		default: 0
	},
	test_rate:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'reviewExam'
	}],
  	createdAt: { 
		type: Date, 
		default: Date.now 
	},
  	updatedAt: { 
		type: Date, 
		default: Date.now 
	}
})

module.exports = mongoose.model('exam', ExamSchema)