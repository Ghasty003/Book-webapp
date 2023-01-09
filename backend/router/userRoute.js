const express = require("express");
const {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/getUsers", getAllUsers);

router.delete("/:id", deleteUser);

module.exports = router;
