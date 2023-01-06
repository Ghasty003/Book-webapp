const Book = require("../model/bookModel");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  const body = req.body;

  try {
    const book = await Book.create(body);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBooks,
  createBook,
};
