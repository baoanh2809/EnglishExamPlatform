/** @format */

const express = require("express");
const Conversations = require("../controllers/conversations.controller");
const authorization = require("../middlewares/authorization.middleware");
const router = express.Router();

router.get(
  "/receivers/users",
  authorization,
  Conversations.getUserConversationsController
);
router.get("/receivers/:receiver_id", authorization, Conversations.getConversationsController);

module.exports = router;
