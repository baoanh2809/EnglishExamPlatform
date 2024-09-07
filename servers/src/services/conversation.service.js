/** @format */
const ReviewExam = require("../models/schemas/reviewExam.model");
const Conversation = require("../models/schemas/conversation.model");

class ConversationService {
  async getConversations({ sender_id, receiver_id, limit, page }) {
    const match = {
      $or: [
        {
          sender_id: sender_id,
          receiver_id: receiver_id,
          status_conversation: "1",
        },
        {
          sender_id: receiver_id,
          receiver_id: sender_id,
          status_conversation: "1",
        },
      ],
    };

    const conversations = await Conversation.find(match)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    const total = await Conversation.countDocuments(match);
    return {
      conversations,
      total,
    };
  }
  async getUserConversations(receiver_id ) {
    const users = await Conversation.aggregate([
      {
        $match: {
          receiver_id: receiver_id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sender_id",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $match: {
          status_conversation: "1",
        },
      },
    ]);
    return users
  }
}

module.exports = new ConversationService();
