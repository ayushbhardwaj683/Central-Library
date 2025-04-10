const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_Id: Number,
  title: String,
  author: String,
  quantity: Number,
  isIssued: { type: Boolean, default: false },
  issuedTo: { type: String, default: null }, // could be userId or name
  issueDate: { type: Date, default: null },
});

module.exports = mongoose.model('Book', bookSchema);
