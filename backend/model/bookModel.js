const { Schema, default: mongoose } = require("mongoose");

const bookSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    bookName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", bookSchema);
