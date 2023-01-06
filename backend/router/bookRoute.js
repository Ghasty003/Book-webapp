const express = require("express");
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBook);

router.post("/", createBook);

router.patch("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
