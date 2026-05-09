const mongoose = require("mongoose");

<<<<<<< HEAD
const bookingSchema = new mongoose.Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
}, { timestamps: true });
=======
const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
>>>>>>> faed3db (Save remaining changes)

    email: {
      type: String,
      required: true,
    },

    phone: String,

    address: String,

    street: String,

    postal: String,

    guests: {
      type: Number,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    category: String,

    time: String,

    status: {
      type: String,
      default: "pending",
    },

    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);