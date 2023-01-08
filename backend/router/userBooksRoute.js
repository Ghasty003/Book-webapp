const express = require("express");
const {
  getUserBooks,
  addToCollection,
} = require("../controller/userBooksController");

const router = express.Router();

router.get("/", getUserBooks);

router.post("/", addToCollection);

module.exports = router;
