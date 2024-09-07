/** @format */

const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Conversation = require("../models/schemas/conversation.model");
const { ObjectId } = require("mongodb");
const User = require("../models/user.model");
const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: "http://localhost:5173" },
  });

  const users = {}

  io.use(async (socket, next) => {
    const { Authorization } = socket.handshake.auth;
    const accessToken = Authorization?.split(" ")[1];
    try {
      const decoded_authorization = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log(decoded_authorization);
      socket.handshake.auth.decoded_authorization = decoded_authorization;
      socket.handshake.auth.accessToken = accessToken;
      next();
    } catch (err) {
      next({
        message: "Unauthorized",
        name: "UnauthorizedError",
        data: err,
      });
    }
  });

  io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);
    console.log(socket.handshake.auth.decoded_authorization._id);
    const user_id  = socket.handshake.auth.decoded_authorization._id;
    users[user_id] = {
      socket_id: socket.id,
    };
    socket.use(async (packet, next) => {
      const { accessToken } = socket.handshake.auth;
      try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
      } catch {
        next(new Error("Unauthorized"));
      }
    });

    socket.on("error", (err) => {
      if (err.message === "Unauthorized") {
        socket.disconnect();
      }
    });
    socket.on("send_message", async (data) => {
      const { receiver_id, sender_id, content } = data.payload;
      console.log(data.payload);
      const receive_socket_id = users[receiver_id]?.socket_id;
      const conversation = new Conversation({
        sender_id: sender_id,
        receiver_id: receiver_id,
        content,
        status_message: 0,
      });
      const result = await conversation.save();
      conversation._id = result._id.toString();
      if (receive_socket_id) {
        socket.to(receive_socket_id).emit("receive_message", {
          payload: conversation,
        });
      }
    });
    socket.on("disconnect", async () => {
      delete users[user_id];
      console.log(`user ${socket.id} disconnected`);
    });
  });
};

module.exports = initSocket;
