const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const IssuedBook = require("../models/IssuedBook");

// Get all available books
router.get("/available", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: err.message });
  }
});

// Get all issued books
router.get("/issued", async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.find();
    res.json(
      issuedBooks.map((item) => ({
        bookId: item.bookId,       // include bookId
        title: item.title,
        userId: item.userId,
        issueDate: item.issueDate,
        dueDate: item.dueDate,
      }))
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching issued books", error: err.message });
  }
});

// Issue a book
router.post("/issue", async (req, res) => {
  try {
    const { bookId, userId, issueDate, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.quantity <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    const issued = new IssuedBook({
      bookId,
      title: book.title,
      userId,
      issueDate,
      dueDate,
    });

    await issued.save();

    book.quantity -= 1;
    await book.save();

    res.status(200).json({ message: "Book issued successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error issuing book", error: err.message });
  }
});

// Return a book
router.post("/return", async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    // Find the issued book by bookId and userId
    const issued = await IssuedBook.findOne({ bookId, userId });
    if (!issued) {
      return res.status(404).json({ message: "Issued record not found" });
    }

    // Delete the issued record
    await issued.deleteOne();

    // Increase quantity back in Book
    const book = await Book.findById(bookId);
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error returning book", error: err.message });
  }
});

module.exports = router;
