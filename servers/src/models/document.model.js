const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DocumentSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: { 
		type: String, 
		required: true
	},
    description: { 
		type: String,
	},
  	createdBy: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'users' 
	},
  	createdAt: { 
		type: Date, 
		default: Date.now 
	}
})

module.exports = mongoose.model('document', DocumentSchema)