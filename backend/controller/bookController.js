const Book = require("../model/bookModel");
const mongoose = require("mongoose");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid book id" });
  }

  try {
    const book = await Book.findOne({ id });

    if (!book) {
      return res.status(404).json({ message: "No such book" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  const { authorName, bookName, image } = req.body;

  const emptyField = [];

  if (!authorName) {
    emptyField.push("authorName");
  }
  if (!bookName) {
    emptyField.push("bookName");
  }
  if (!image) {
    emptyField.push("image");
  }

  if (emptyField.length > 0) {
    return res
      .status(400)
      .json({ error: "All fields must be filled.", emptyField });
  }

  try {
    const exists = await Book.findOne({ authorName, bookName, image });

    if (exists) {
      return res.status(400).json({ error: "Book already exists" });
    }

    const book = await Book.create({ authorName, bookName, image });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid book id" });
  }

  try {
    const book = await Book.findOneAndUpdate(
      { id },
      {
        ...req.body,
      }
    );

    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid book id" });
  }

  try {
    const book = await Book.findOneAndDelete({ _id: id });

    if (!book) {
      return res.status(404).json({ message: "No such book" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
