const express = require("express");
const mongoose = require("mongoose");

const bookRoute = require("./router/bookRoute");

const app = express();

app.use(express.json());
app.use("/api/books", bookRoute);

mongoose
  .connect("mongodb://0.0.0.0:27017/books")
  .then(() => {
    app.listen(4000, () => {
      console.log("connected to db & listening on port 4000");
    });
  })
  .catch((error) => {
    console.log("Error occured", error);
  });
