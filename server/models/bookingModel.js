const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
  date: { type: String, required: true }, // Store as YYYY-MM-DD
  paymentId: { type: String, required: true }, // Razorpay payment ID
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);