const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("Get request");
});

router.post("/", (req, res) => {
  res.status(200).json("Post request");
});

module.exports = router;
