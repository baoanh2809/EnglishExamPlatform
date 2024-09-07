/** @format */
const ReviewExam = require("../models/schemas/reviewExam.model");

class ReviewExamsService {
  async getAllReview({
  }) {
    try {
        const result = await ReviewExam.find();
        return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new ReviewExamsService();
