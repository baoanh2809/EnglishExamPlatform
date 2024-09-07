/** @format */

const Exam = require("../models/exam.model");
const QuestionsSchema = require("../models/questions.model");
const searchService = require("../services/search.service");

module.exports = {
  createExamByLevel: async function (req, res, next) {
    try {
      let randomQuestion = new Set();
      let questions = await QuestionsSchema.find({
        level: req.body.level,
      }).limit(30);

      for (let question in questions) {
        if (randomQuestion.size >= 5) break;
        randomQuestion.add(
          questions[Math.floor(Math.random() * questions.length)]._id
        );
      }
      const newExam = new Exam({
        title: req.body.title,
        questions: Array.from(randomQuestion),
      });
      const examByLevel = await newExam.save();
      return res.status(200).json(examByLevel);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  getExams: async function (req, res, next) {
    try {
      // if (req) {
        const result = await searchService.search({
          type: req.query.type || 0,
          level: req.query.level || 0,
          title: req.query.title || "",
          createdBy: req.query.createdBy || "",
          user_tests_min: req.query.user_tests_min || "",
          user_tests_max: req.query.user_tests_max || "",
          user_views_min: req.query.user_views_min || "",
          user_views_max: req.query.user_views_max || "",
          test_rate: req.query.test_rate || "",
          sort_by: req.query.sort_by || "rate_avg", // Add sort_by parameter
          examscontants: req.query.examscontants || "desc",
        });
        // console.log(result);
        // return res.status(200).json(result);
      // }
      // const result = await Exam.find().populate("questions");
      
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  getExamById: async function (req, res, next) {
    try {
      let exams = await Exam.findById(req.params.id).populate("questions");
      await Exam.findByIdAndUpdate(req.params.id, { $inc: { user_views: 1 } });
      return res.status(200).json(exams);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
