const Booking =
  require("../models/Booking");

class BookingFacade {

  // CREATE BOOKING

  static async createBooking(data) {

    const booking =
      await Booking.create(data);

    return booking;
  }

  // GET ALL BOOKINGS

  static async getBookings() {

    return await Booking.find()
      .sort({
        createdAt: -1,
      });
  }

  // GET SINGLE BOOKING

  static async getBookingById(id) {

    return await Booking.findById(
      id
    );
  }

  // UPDATE BOOKING

  static async updateBooking(
    id,
    data
  ) {

    return await Booking.findByIdAndUpdate(

      id,

      data,

      {
        new: true,
      }
    );
  }

  // DELETE BOOKING

  static async deleteBooking(id) {

    return await Booking.findByIdAndDelete(
      id
    );
  }
}

module.exports =
  BookingFacade;