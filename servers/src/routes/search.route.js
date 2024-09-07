/** @format */

const express = require("express");
const ExamController = require("../controllers/exam.controller");
const StudentController = require("../controllers/student.controller");
const SearchController = require("../controllers/search.controller");
const router = express.Router();

// router.post("/", ExamController.createExamByLevel);
router.get("/", SearchController.searchController);

module.exports = router;
