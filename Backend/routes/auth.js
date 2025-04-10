const express = require('express');
const router = express.Router();

// Dummy login handler
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Replace with real validation from your DB
  if (email === 'singhrajput4676@gmail.com' && password === 'ayush406') {
    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
