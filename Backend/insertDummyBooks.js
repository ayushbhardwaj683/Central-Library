require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book");

const MONGODB_URI = process.env.MONGODB_URI || "your_fallback_uri_here";

// Dummy books with bookId
const dummyBooks = [
  { bookId: "1", title: "Atomic Habits", author: "James Clear", quantity: 5 },
  { bookId: "2", title: "The Alchemist", author: "Paulo Coelho", quantity: 3 },
  { bookId: "3", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", quantity: 4 },
  { bookId: "4", title: "Sapiens", author: "Yuval Noah Harari", quantity: 6 },
  { bookId: "5", title: "The Power of Now", author: "Eckhart Tolle", quantity: 2 },
];

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    await Book.insertMany(dummyBooks);
    console.log("Dummy books inserted successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error inserting dummy books:", err);
  });
