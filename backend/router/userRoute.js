const express = require("express");
const {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUserDetails,
} = require("../controller/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/getUsers", getAllUsers);

router.delete("/:id", deleteUser);

router.patch("/update/:id", updateUserDetails);

module.exports = router;
