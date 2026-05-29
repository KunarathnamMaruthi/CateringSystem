const express =
  require("express");

const router =
  express.Router();

const {

  createBooking,

  getBookings,

  getBooking,

  updateBooking,

  deleteBooking,

} = require(
  "../controllers/BookingController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

// CREATE BOOKING

router.post(

  "/create",

  authMiddleware,

  createBooking
);

// GET ALL BOOKINGS

router.get(

  "/",

  authMiddleware,

  getBookings
);

// GET SINGLE BOOKING

router.get(

  "/:id",

  authMiddleware,

  getBooking
);

// UPDATE BOOKING

router.put(

  "/:id",

  authMiddleware,

  updateBooking
);

// DELETE BOOKING

router.delete(

  "/:id",

  authMiddleware,

  deleteBooking
);

module.exports =
  router;