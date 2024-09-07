/** @format */
const conversationService = require("../services/conversation.service");

module.exports = {
  getConversationsController: async function (req, res, next) {
    try {
      const { receiver_id } = req.params;
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);
      const sender_id = req.user._id;
      const result = await conversationService.getConversations({
        sender_id,
        receiver_id,
        limit,
        page,
      });

      return res.json({
        result: {
          conversations: result.conversations,
          limit,
          page,
          total_page: Math.ceil(result.total / limit),
        },
        message: "Get conversations successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },

  getUserConversationsController: async function (req, res, next) {
    try {
      const receiver_id = req.user._id;
      const result = await conversationService.getUserConversations(
        receiver_id
      );
      return res.json({
        result: result,
        message: "Get Users ConverSation successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
