/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewExamSchema = new Schema({
  examID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  test_rate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reviewExam", reviewExamSchema);
