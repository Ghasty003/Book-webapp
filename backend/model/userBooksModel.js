const { Schema, default: mongoose } = require("mongoose");

const userBooksSchema = new Schema({
  authorName: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userBooks", userBooksSchema);
