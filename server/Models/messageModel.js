const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    message: String,
    senderId: String,
    chatId: String,
  },
  {
    timestamps: true,
  }
);
const messageModel = mongoose.model("messages", messageSchema);
module.exports = messageModel;
