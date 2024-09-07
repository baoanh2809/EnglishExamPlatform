/** @format */

const express = require("express");
const ReviewExamController = require("../controllers/reviewExam.controller");
const router = express.Router();

// router.post("/", ExamController.createExamByLevel);
router.get("/", ReviewExamController.getAllReviewExam);
router.post("/", ReviewExamController.createReviewExam);
router.get("/:id", ReviewExamController.getReviewExamById);
router.put("/:id", ReviewExamController.updateReviewExam);
router.delete("/:id", ReviewExamController.deleteReviewExam);
module.exports = router;
