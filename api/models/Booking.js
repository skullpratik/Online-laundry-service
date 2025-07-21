const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  clothCount: { type: Number, required: true },
  serviceType: { type: String, required: true },
  notes: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema); 