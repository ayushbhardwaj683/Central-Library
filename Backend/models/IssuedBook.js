const mongoose = require('mongoose');

const issuedBookSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  title: String,
  userId: String,
  issueDate: Date,
  dueDate: Date,
});

module.exports = mongoose.model('IssuedBook', issuedBookSchema);
