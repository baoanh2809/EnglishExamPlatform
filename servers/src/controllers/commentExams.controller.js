/** @format */
const commentexams = require("../models/schemas/commentExams.model");

module.exports = {
  getComment: async function (req, res, next) {
    try {
      let comment = await commentexams.find({ exam_id: req.params.exam_id });
      return res.status(200).json(comment);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },

  postComment: async function (req, res, next) {
    try {
      const user_id = req.user._id;
      let newComment = new commentexams({
        exam_id: req.params.exam_id,
        user_id,
        content: req.body.content,
      });
      const comment = await newComment.save();
      return res.status(200).json(comment);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },

  deleteComment: async function (req, res, next) {
    try {
      await commentexams.findByIdAndDelete(req.params.id);
      return res.status(200);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  updateComment: async function (req, res, next) {
    try {
      const result = await commentexams.findByIdAndUpdate(req.params.id, {
        content: req.body.content,
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
