const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/BookingController");

router.post("/", auth, createBooking);

router.get("/", auth, getBookings);

router.put("/:id", auth, updateBooking);

router.delete("/:id", auth, deleteBooking);

module.exports = router;