require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoute = require("./router/bookRoute");
const userRoute = require("./router/userRoute");
const userBooksRoute = require("./router/userBooksRoute");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/books", bookRoute);
app.use("/api/users", userRoute);
app.use("/api/users/collection", userBooksRoute);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error occured", error);
  });
