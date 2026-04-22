const router = require("express").Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// CREATE
router.post("/", auth, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      userId: req.user.id,
    });

    const saved = await booking.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// USER BOOKINGS
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN ALL BOOKINGS
router.get("/all", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const bookings = await Booking.find();
    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;