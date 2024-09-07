const express = require('express')
const DocumentController = require('../controllers/document.controller')
const authorization = require("../middlewares/authorization.middleware");
const router = express.Router()

router.post('/', authorization('teacher'), DocumentController.createDocument)
router.get('/', DocumentController.getDocuments)
router.get('/:id', DocumentController.getDocumentById)

module.exports = router