const express = require("express");
const { signupUser } = require("../controller/userController");

const router = express.Router();

router.post("/login");

router.post("/signup", signupUser);

module.exports = router;
