const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// CREATE
router.post("/", auth, async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      userId: req.user.id,
    });

    res.json(booking);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// GET
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const all = await Booking.find();
      return res.json(all);
    }

    const userBookings = await Booking.find({
      userId: req.user.id,
    });

    res.json(userBookings);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;