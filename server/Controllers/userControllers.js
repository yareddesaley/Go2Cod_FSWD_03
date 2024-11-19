const userModel = require("../Models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" });
};

//user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(`name:${name},email:${email},password:${password}`);
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("the email already exists");
    if (!name || !email || !password)
      return res.status(400).json("all fields are required");
    if (!validator.isEmail(email))
      return res.status(400).json("email is not correct");
    if (!validator.isStrongPassword(password))
      return res.status(400).json("password is not strong");
    user = new userModel({ name, password, email });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = createToken(user._id);
    res.json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//userlogin
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json("email or Passwor is not registered");

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json("email or password is not correct");
    }
    res.json({ user });
  } catch (error) {
    res.json(error);
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.json(error);
  }
};
//get one user
const getOneUser = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    let user = await userModel.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      "error from getting one user": error,
    });
  }
};

module.exports = { registerUser, userLogin, getAllUsers, getOneUser };
