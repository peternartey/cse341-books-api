
const { getDatabase } = require("../database/connection");

const getAllBooks = async (req, res) => {
  try {
    const db = getDatabase();

    const books = await db.collection("books").find().toArray();

    res.status(200).json(books);
  } catch (error) {
    console.error("Error getting books:", error);

    if (error.message === "Database is not connected") {
      return res.status(503).json({
        message: "Database is unavailable.",
      });
    }

    res.status(500).json({
      message: "An error occurred while retrieving books.",
    });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const db = getDatabase();

    const bookId = Number(req.params.id);

    const book = await db.collection("books").findOne({ id: bookId });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error getting book:", error);

    if (error.message === "Database is not connected") {
      return res.status(503).json({
        message: "Database is unavailable.",
      });
    }

    res.status(500).json({
      message: "An error occurred while retrieving the book.",
    });
  }
};

module.exports = { getAllBooks, getSingleBook };

