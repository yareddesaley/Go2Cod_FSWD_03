const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
  const { userOneId, userTwoId } = req.body;
  try {
    let user = await chatModel.findOne({
      members: { $all: [userOneId, userTwoId] },
    });
    if (user) return res.status(200).json(user);
    user = new chatModel({ members: [userOneId, userTwoId] });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
//find user chat
const findUserChat = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const chat = await chatModel.find({
      members: { $in: [chatId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
//
const findChat = async (req, res) => {
  const { userOneId, userTwoId } = req.params;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [userOneId, userTwoId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { createChat, findUserChat, findChat };
