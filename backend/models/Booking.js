const mongoose =
  require("mongoose");

// ================= BOOKING SCHEMA =================

const bookingSchema =
  new mongoose.Schema(

    {

      // USER DETAILS

      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      street: {
        type: String,
        default: "",
      },

      postal: {
        type: String,
        default: "",
      },

      // BOOKING DETAILS

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
        required: true,
      },

      time: {
        type: String,
        required: true,
      },

      // STATUS

      status: {
        type: String,
        enum: [
          "pending",
          "approved",
          "cancelled",
          "preparing",
          "completed",
        ],
        default: "pending",
      },

      // USER LINK

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

    },

    {
      timestamps: true,
    }
  );

// ================= EXPORT =================

module.exports =
  mongoose.model(
    "Booking",
    bookingSchema
  );