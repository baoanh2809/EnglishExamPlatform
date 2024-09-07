const Exam = require('../models/exam.model')
const EnrolledExam = require('../models/enrolledExam.model')
const questionsController = require('./questions.controller')

module.exports = {
	doAnExam: async function(req, res, next) {
		const { answersUser } = req.body
		const examID = req.params.id
		try {
			let exam = await Exam.findById(examID).populate("questions")
			if (exam == null) {
				return res.status(400) // show err, cant find exam
			}

			let overallScore = 0
			const answerSheet = []
			for (let quest of exam.questions) {
				for (let {answerID, questionID} of answersUser) {
					if (questionID == quest._id) {
						let correctAnswer = quest.answers.find((answer) => answer.isCorrectAnswer == true)
						if (correctAnswer._id == answerID) 
							overallScore += 10/exam.questions.length
						answerSheet.push(answerID)
					}
				}
			}

			let newEnrolledExam = new EnrolledExam({
				examID: examID,
				answers: answerSheet,
				score: overallScore,
				studentID: req.user,
				completed: true
			})
			await Exam.findByIdAndUpdate(examID, { $inc: { user_tests: 1 } })
			const enrolledExam = await newEnrolledExam.save()

			return res.status(200).json(enrolledExam);
		}
		catch (error) {
			console.log(error)
			res.status(500)
		}
	},

}
