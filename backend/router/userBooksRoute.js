const express = require("express");
const {
  getUserBooks,
  addToCollection,
  removeFromCollection,
} = require("../controller/userBooksController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getUserBooks);

router.post("/", addToCollection);

router.delete("/:id", removeFromCollection);

module.exports = router;
