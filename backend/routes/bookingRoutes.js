const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// ================= CREATE BOOKING =================
router.post("/", auth, async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= GET BOOKINGS =================
router.get("/", auth, async (req, res) => {
  try {
    // ✅ Admin gets all bookings
    if (req.user.isAdmin) {
      const allBookings = await Booking.find()
        .sort({ createdAt: -1 });

      return res.json(allBookings);
    }

    // ✅ Normal user gets own bookings
    const userBookings = await Booking.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(userBookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= UPDATE BOOKING =================
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= DELETE BOOKING =================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      message: "Booking deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;