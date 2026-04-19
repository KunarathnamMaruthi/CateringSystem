import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  category: String,
  eventDate: Date,
  time: String,
  guests: Number,
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);