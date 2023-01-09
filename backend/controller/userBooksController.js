const UserBooks = require("../model/userBooksModel");

const getUserBooks = async (req, res) => {
  try {
    const books = await UserBooks.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToCollection = async (req, res) => {
  const { authorName, bookName, image } = req.body;

  try {
    const exists = await UserBooks.findOne({ authorName, bookName, image });

    if (exists) {
      return res
        .status(400)
        .json({ error: "Book already exists in your collection" });
    }

    const book = await UserBooks.create({ authorName, bookName, image });

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFromCollection = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await UserBooks.findOneAndDelete({ _id: id });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserBooks,
  addToCollection,
  removeFromCollection,
};
