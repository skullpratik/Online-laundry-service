const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Register
router.post('/register', async (req, res) => {
  console.log('Register route hit', req.body);
  try {
    const { email, phone, password, name } = req.body;
    if (!email && !phone) {
      console.log('Missing email or phone');
      return res.status(400).json({ error: 'Email or phone is required' });
    }
    if (!password) {
      console.log('Missing password');
      return res.status(400).json({ error: 'Password is required' });
    }
    const user = new User({ email, phone, password, name });
    await user.save();
    console.log('User registered:', user._id);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if ((!email && !phone) || !password) return res.status(400).json({ error: 'Email or phone and password are required' });
    const user = await User.findOne(email ? { email } : { phone });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, phone: user.phone, name: user.name } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 