const Booking =
  require("../models/Booking");

// ================= CREATE BOOKING =================

exports.createBooking =
  async (req, res) => {

    try {

      const booking =
        await Booking.create({

          name:
            req.body.name,

          email:
            req.body.email,

          phone:
            req.body.phone,

          address:
            req.body.address,

          guests:
            req.body.guests,

          eventDate:
            req.body.eventDate,

          category:
            req.body.category,

          time:
            req.body.time,

          status:
            "pending",

          userId:
            req.user.id,
        });

      res.status(201).json({

        success: true,

        message:
          "Booking created successfully",

        booking,
      });

    } catch (error) {

      console.error(
        "CREATE BOOKING ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Booking failed",
      });
    }
  };

// ================= GET BOOKINGS =================

exports.getBookings =
  async (req, res) => {

    try {

      // ADMIN CAN SEE ALL BOOKINGS

      const bookings =
        await Booking.find()

          .sort({
            createdAt: -1,
          });

      res.json({

        success: true,

        bookings,
      });

    } catch (error) {

      console.error(
        "GET BOOKINGS ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch bookings",
      });
    }
  };

// ================= UPDATE BOOKING =================

exports.updateBooking =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",
        });
      }

      // UPDATE DATA

      booking.name =
        req.body.name ||
        booking.name;

      booking.email =
        req.body.email ||
        booking.email;

      booking.phone =
        req.body.phone ||
        booking.phone;

      booking.address =
        req.body.address ||
        booking.address;

      booking.guests =
        req.body.guests ||
        booking.guests;

      booking.category =
        req.body.category ||
        booking.category;

      booking.eventDate =
        req.body.eventDate ||
        booking.eventDate;

      booking.time =
        req.body.time ||
        booking.time;

      booking.status =
        req.body.status ||
        booking.status;

      // SAVE

      const updatedBooking =
        await booking.save();

      res.json({

        success: true,

        message:
          "Booking updated successfully",

        booking:
          updatedBooking,
      });

    } catch (error) {

      console.error(
        "UPDATE BOOKING ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Update failed",
      });
    }
  };

// ================= DELETE BOOKING =================

exports.deleteBooking =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",
        });
      }

      await Booking.findByIdAndDelete(
        req.params.id
      );

      res.json({

        success: true,

        message:
          "Booking deleted successfully",
      });

    } catch (error) {

      console.error(
        "DELETE BOOKING ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Delete failed",
      });
    }
  };