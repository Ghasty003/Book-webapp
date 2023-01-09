const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const userId = user._id;
    const token = createToken(userId);

    const userName = user.userName;

    res.status(200).json({ userName, token, email, userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const user = await User.signup(email, password, userName);
    const userId = user._id;
    const token = createToken(userId);
    res.status(200).json({ email, token, userName, userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).where("email").ne("admin@dev.com").sort({
      userName: 1,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
};
