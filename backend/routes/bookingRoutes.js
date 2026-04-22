const router = require("express").Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// ================= CREATE BOOKING =================
router.post("/", auth, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      userId: req.user.id,
    });

    const savedBooking = await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= GET USER BOOKINGS =================
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= ADMIN: GET ALL BOOKINGS =================
router.get("/all", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= UPDATE BOOKING =================
router.put("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= DELETE BOOKING =================
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;