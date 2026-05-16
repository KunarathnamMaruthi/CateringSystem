const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    street: {
      type: String,
    },

    postal: {
      type: String,
    },

    guests: {
      type: Number,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
    },

    time: {
      type: String,
    },

    status: {
      type: String,
      default: "pending",
    },

    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
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