/** @format */

const Exam = require("../models/exam.model");
const { ExamLevel } = require("../config/enums");
class SearchService {
  async search({
    type,
    level,
    title,
    user_tests_min,
    sort_by,
    examscontants,
    user_tests_max,
    user_views_min,
    user_views_max,
    test_rate,
  }) {
    try {
      const $match = {};
      if (title) $match.title = { $regex: title, $options: "i" };

      if (type) $match.type = Number(type);
      if (level) $match.level = Number(level);
      if (user_tests_min && user_tests_max) {
        $match.user_tests = { $gte: Number(user_tests_min), $lte: user_tests_max };
      }
      if (user_views_min) $match.user_views = { $gte: user_views_min };
      if (user_views_max) $match.user_views = { $lte: user_views_max };
      const sort = {};
      sort[sort_by] = examscontants === "asc" ? 1 : -1;
      console.log($match);
      const result = await Exam.aggregate([
        {
          $match,
        },
        {
          $lookup: {
            from: "reviewexams",
            localField: "test_rate",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $addFields: {
            rate_count: {
              $size: "$result",
            },
            rate_avg: {
              $avg: "$result.test_rate",
            },
          },
        },
        {
          $sort: sort
        },
      ]);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new SearchService();
