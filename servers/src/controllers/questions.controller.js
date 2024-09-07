const Questions = require('../models/questions.model')

module.exports = {
	
	createQuestion: async function(req, res, next) {
		try {
			const newQuestion = new Questions({
				text: req.body.questionText,
				answers: req.body.answers,
				createdBy: req.user,
				level: req.body.level
			});
	  
			const question = await newQuestion.save();
	  
			return res.status(200).json(question);
		}
		catch (error) {
			console.log(error)
			res.status(500)
		}
	},
	getAllQuestion: async function(req, res, next) {
		
		try {
			const data = await Questions.find()
			return res.status(200).json(data)
		}
		catch (error) {
			console.log(error)
			res.status(500)
		}
	},
}
