const Booking = require("../models/Booking");

// CREATE BOOKING =================
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

// ================= GET BOOKINGS =================
exports.getBookings = async (req, res) => {
  try {
    let bookings;

    // ADMIN
    if (req.user.isAdmin) {
      bookings = await Booking.find().sort({
        createdAt: -1,
      });
    }

    // NORMAL USER
    else {
      bookings = await Booking.find({
        userId: req.user.id,
      }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// ================= UPDATE BOOKING =================
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("UPDATE BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
};

// ================= DELETE BOOKING =================
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
};