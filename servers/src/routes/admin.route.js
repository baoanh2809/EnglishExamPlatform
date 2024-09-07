const express = require("express");
const { 
  createAdmin,
  getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  getExams,
  getQuestions,
  getDocuments,
  getExamById,
  getQuestionById,
  getDocumentById,
  deleteExam,
  deleteQuestion,
  deleteDocument,
  updateExam,
  updateQuestion,
  updateDocument,
  getEnrolledUsers,
} = require("../controllers/admin.controller");
const QuestionsController = require('../controllers/questions.controller')
const ExamController = require('../controllers/exam.controller')
const DocumentController = require('../controllers/document.controller')
const authorization = require("../middlewares/authorization.middleware");
const router = express.Router();

router.post("/admin", authorization('admin'), createAdmin);

router
  .route("/admin/user")
  .get(authorization('admin'), getUser)
  .post(authorization('admin'), createUser)
  
router
  .route("/admin/user/:id")
  .get(authorization('admin'), getUserById)
  .delete(authorization('admin'), deleteUser)
  .put(authorization('admin'), updateUser)

router.get("/admin/exam", authorization('admin'), getExams)
router.post('/admin/exam', authorization('admin'), ExamController.createExamByLevel)
router.get("/admin/exam/:id", authorization('admin'), getExamById)
router.put("/admin/exam/:id", authorization('admin'), updateExam)
router.delete("/admin/exam/:id", authorization('admin'), deleteExam)

router.get("/admin/question", authorization('admin'), getQuestions)
router.post("/admin/question", authorization('admin'), QuestionsController.createQuestion)
router.get("/admin/question/:id", authorization('admin'), getQuestionById)
router.put("/admin/question/:id", authorization('admin'), updateQuestion)
router.delete("/admin/question/:id", authorization('admin'), deleteQuestion)

router.get("/admin/document", authorization('admin'), getDocuments)
router.post("/admin/document", authorization('admin'), DocumentController.createDocument)
router.get("/admin/document/:id", authorization('admin'), getDocumentById)
router.put("/admin/document/:id", authorization('admin'), updateDocument)
router.delete("/admin/document/:id", authorization('admin'), deleteDocument)

router.get("/admin/enrolled/:userId", authorization('admin'), getEnrolledUsers)

module.exports = router;