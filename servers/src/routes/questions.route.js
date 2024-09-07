const express = require('express')
const QuestionsController = require('../controllers/questions.controller')
const authorization = require("../middlewares/authorization.middleware")
const router = express.Router()

router.post('/', authorization('teacher'), QuestionsController.createQuestion)
router.get('/', authorization('teacher'), QuestionsController.getAllQuestion)

module.exports = router