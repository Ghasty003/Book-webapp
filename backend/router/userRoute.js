const express = require("express");
const {
  signupUser,
  loginUser,
  getAllUsers,
} = require("../controller/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/getUsers", getAllUsers);

module.exports = router;
