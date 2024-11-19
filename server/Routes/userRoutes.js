const express = require("express");
const {
  registerUser,
  userLogin,
  getAllUsers,
  getOneUser,
} = require("../Controllers/userControllers");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/getoneuser:userId", getOneUser);
router.get("/allusers", getAllUsers);
module.exports = router;
