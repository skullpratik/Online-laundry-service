require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Commented out MongoDB and routes for debugging
// const mongoose = require('mongoose');
// let isConnected = false;
// async function connectToDatabase() {
//   if (isConnected) return;
//   await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   isConnected = true;
// }
// app.use(async (req, res, next) => {
//   try {
//     await connectToDatabase();
//     next();
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     res.status(500).json({ error: 'Database connection error' });
//   }
// });
// const bookingRoutes = require('./routes/booking');
// app.use('/api/bookings', bookingRoutes);
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// Only keep the test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

module.exports = serverless(app); 