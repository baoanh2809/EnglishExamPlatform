/** @format */

const express = require("express");
const CommentExams = require("../controllers/commentExams.controller");
const authorization = require("../middlewares/authorization.middleware");
const router = express.Router();

router.get(
  "/:exam_id",
  authorization,
  CommentExams.getComment
);
router.post(
  "/:exam_id",
  authorization,
  CommentExams.postComment
);
router.delete(
  "/:id",
  authorization,
  CommentExams.deleteComment
);
router.put(
  "/:id",
  authorization,
  CommentExams.updateComment
);


module.exports = router;
