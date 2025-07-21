require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://online-laundry-service-hntiuu4qe-pratiks-projects-41f126a0.vercel.app',
    'https://online-laundry-service.vercel.app'
  ],
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true, // deprecated, removed
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const bookingRoutes = require('./routes/booking');
app.use('/api/bookings', bookingRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Sample route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

module.exports = app; 