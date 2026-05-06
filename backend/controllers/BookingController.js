class BookingController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res) => {
    try {
      const booking = await this.service.createBooking(
        req.body,
        req.user.id
      );

      res.status(201).json(booking);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  get = async (req, res) => {
    try {
      const bookings = await this.service.getUserBookings(
        req.user.id
      );

      res.json(bookings);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
}

module.exports = BookingController;