
const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getSingleBook,
} = require("../controllers/books");

router.get("/", getAllBooks);

router.get("/:id", getSingleBook);

module.exports = router;
