const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/auth");

const {

  createBooking,

  getBookings,

  updateBooking,

  deleteBooking,

} = require(
  "../controllers/BookingController"
);

// ================= CREATE BOOKING =================

router.post(
  "/",
  auth,
  createBooking
);

// ================= GET BOOKINGS =================

router.get(
  "/",
  auth,
  getBookings
);

// ================= UPDATE BOOKING =================

router.put(
  "/:id",
  auth,
  updateBooking
);

// ================= DELETE BOOKING =================

router.delete(
  "/:id",
  auth,
  deleteBooking
);

module.exports =
  router;