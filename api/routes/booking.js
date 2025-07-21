const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// Create a new booking (protected)
router.post('/', auth, async (req, res) => {
  try {
    console.log('Received booking:', req.body);
    const booking = new Booking({ ...req.body, user: req.user._id });
    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Booking creation error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get all bookings (admin only, not protected here)
router.get('/', async (req, res) => {
  console.log('GET /api/bookings called');
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bookings for the logged-in user (protected)
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single booking by ID (protected)
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a booking by ID (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Booking not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a booking by ID (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Attempting to delete booking:', req.params.id, 'for user:', req.user._id);
    const deleted = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) {
      console.log('Booking not found or not owned by user.');
      return res.status(404).json({ error: 'Booking not found' });
    }
    console.log('Booking deleted:', deleted._id);
    res.json({ message: 'Booking deleted', booking: deleted });
  } catch (err) {
    console.error('Error deleting booking:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 