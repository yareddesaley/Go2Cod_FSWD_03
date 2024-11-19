const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./Routes/userRoutes");
const chatRouter = require("./Routes/chatRoutes");
const messageRouter = require("./Routes/messageRoutes");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4444;
const uri = process.env.URI;
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(chatRouter);
app.use(messageRouter);
mongoose
  .connect(uri)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(`connection to db failed : ${err.message}`));
app.listen(port, (req, res) => {
  console.log(`connected to port ${port}`);
});
