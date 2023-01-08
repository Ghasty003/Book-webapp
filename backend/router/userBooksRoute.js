const express = require("express");
const {
  getUserBooks,
  addToCollection,
  removeFromCollection,
} = require("../controller/userBooksController");

const router = express.Router();

router.get("/", getUserBooks);

router.post("/", addToCollection);

router.delete("/:id", removeFromCollection);

module.exports = router;
