const express = require("express");
const {
  createChat,
  findChat,
  findUserChat,
} = require("../Controllers/chatControllers");
const router = express.Router();
router.post("/createchat", createChat);
router.get("/chat:chatId", findUserChat);
router.get("/chat/:userOneId/:userTwoId", findChat);
module.exports = router;
