const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  street: { type: String },
  postal: { type: String },
  guests: { type: String },
  date: { type: Date },
  category: { type: String },
  time: { type: String },
  status: {
    type: String,
    default: "pending"
  },
  userId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);