const mongoose =
  require("mongoose");

const bookingSchema =
  new mongoose.Schema(

    {
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
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
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
        required: true,
        trim: true,
      },

      time: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "pending",
      },

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

module.exports =
  mongoose.model(
    "Booking",
    bookingSchema
  );