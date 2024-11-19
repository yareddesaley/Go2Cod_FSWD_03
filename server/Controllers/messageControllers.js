const messageModel = require("../Models/messageModel");
//create message
const createMessage = async (req, res) => {
  const { message, chatId, senderId } = req.body;
  try {
    const chatMessages = new messageModel({ message, chatId, senderId });
    const response = await chatMessages.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get message
const getMessage = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const chatMessages = await messageModel.find({ chatId: chatId });
    res.status(200).json(chatMessages);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { createMessage, getMessage };
