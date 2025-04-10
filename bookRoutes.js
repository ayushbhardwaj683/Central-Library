// const express = require('express');
// const router = express.Router();
// const Book = require('../models/Book');
// const IssuedBook = require('../models/IssuedBook');

// router.get('/books/issued', async (req, res) => {
//   const issuedBooks = await IssuedBook.find().populate('book_id');
//   res.json(issuedBooks.map(issue => ({
//     title: issue.book_id.title,
//     user_id: issue.user_id,
//     issue_date: issue.issue_date,
//     due_date: issue.due_date
//   })));
// });


// router.get('/books/available', async (req, res) => {
//   const books = await Book.find();
//   res.json(books);
// });


// router.post('/books/issue', async (req, res) => {
//   const { book_id, user_id, issue_date, due_date } = req.body;

//   const book = await Book.findById(book_id);
//   if (!book || book.quantity <= 0) {
//     return res.status(400).json({ message: 'Book not available' });
//   }

//   book.quantity -= 1;
//   await book.save();

//   const issued = new IssuedBook({
//     book_id,
//     user_id,
//     issue_date,
//     due_date
//   });
//   await issued.save();

//   res.json({ message: 'Book issued successfully' });
// });


// router.post('/books/return', async (req, res) => {
//   const { issue_id, book_id } = req.body;

//   const book = await Book.findById(book_id);
//   if (book) {
//     book.quantity += 1;
//     await book.save();
//   }

//   await IssuedBook.findByIdAndDelete(issue_id);

//   res.json({ message: 'Book returned successfully' });
// });

// module.exports = router;
