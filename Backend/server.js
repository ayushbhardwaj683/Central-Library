require('dotenv').config();
console.log("MONGODB_URI is:", process.env.MONGODB_URI);

const bookRoutes = require('./routes/book');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const authRoutes  = require('./routes/auth');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
//to check if frontend is connected or not
app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
  });
  
  
//every time api is hit it will show in the terminal
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
  

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
//(homepage)
app.get('/', (req, res) => {
    res.send('Welcome to the Central Library System!');
  });
  

// MongoDB Connection

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((error) => console.log(error));








