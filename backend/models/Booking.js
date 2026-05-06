const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  category: String,
  eventDate: Date,
  time: String,
  guests: Number,
  status: { type: String, default: "pending" },
  userId: String
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);