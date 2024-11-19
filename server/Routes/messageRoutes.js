const express = require("express");
const {
  createMessage,
  getMessage,
} = require("../Controllers/messageControllers");
const router = express.Router();
router.post("/createmessage", createMessage);
router.get("/getmessage:chatId", getMessage);
module.exports = router;
