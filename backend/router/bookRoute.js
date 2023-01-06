const express = require("express");
const { createBook, getBooks } = require("../controller/bookController");

const router = express.Router();

router.get("/", getBooks);

router.post("/", createBook);

module.exports = router;
