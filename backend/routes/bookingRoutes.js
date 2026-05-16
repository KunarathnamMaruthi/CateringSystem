const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Booking = require("../models/Booking");

const BookingService = require(
  "../services/BookingService"
);

const BookingController = require(
  "../controllers/BookingController"
);

// ================= OOP OBJECTS =================
const bookingService =
  new BookingService(Booking);

const bookingController =
  new BookingController(bookingService);

// ================= CREATE BOOKING =================
router.post(
  "/",
  auth,
  bookingController.create
);

// ================= GET BOOKINGS =================
router.get(
  "/",
  auth,
  bookingController.get
);

// ================= UPDATE BOOKING =================
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedBooking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      message:
        "Booking updated successfully",
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
    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Booking deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;