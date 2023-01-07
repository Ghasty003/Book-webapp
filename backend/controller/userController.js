const User = require("../model/userModel");

const loginUser = async (req, res) => {
  try {
  } catch (error) {}
};

const signupUser = async (req, res) => {
  const body = req.body;

  try {
    const user = await User.signup(body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
};
