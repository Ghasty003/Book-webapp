const UserBooks = require("../model/userBooksModel");

const getUserBooks = async (req, res) => {
  const user_id = req.user._id;
  try {
    const books = await UserBooks.find({ user_id });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToCollection = async (req, res) => {
  const { authorName, bookName, image } = req.body;

  const user_id = req.user._id;

  try {
    const exists = await UserBooks.findOne({
      authorName,
      bookName,
      image,
      user_id,
    });

    if (exists) {
      return res
        .status(400)
        .json({ error: "Book already exists in your collection" });
    }

    const book = await UserBooks.create({
      authorName,
      bookName,
      image,
      user_id,
    });

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
