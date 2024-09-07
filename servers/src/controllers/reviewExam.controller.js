/** @format */
const reviewExam = require("../models/schemas/reviewExam.model");
const exam = require("../models/exam.model");
const ReviewExamsService = require("../services/reviewExams.service");
module.exports = {
  getAllReviewExam: async function (req, res, next) {
    try {
      const result = await ReviewExamsService.getAllReview();
      return res.status(200).json({ message: "Get all exams", data: result });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  getReviewExamById: async function (req, res, next) {
    try {
      const result = await reviewExam.findById(req.params.id).populate("exam");
      return res.status(200).json({ message: "Get all exams", data: result });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  createReviewExam: async function (req, res, next) {
    try {
      const result = await reviewExam.create(req.body);
      return res
        .status(200)
        .json({ message: "Đánh giá thành công", data: result });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  updateReviewExam: async function (req, res, next) {
    try {
      const result = await reviewExam.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({ message: "Cập nhật thành công", data: result });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  deleteReviewExam: async function (req, res, next) {
    try {
    await reviewExam.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ message: "Xóa thành công"});
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
};
