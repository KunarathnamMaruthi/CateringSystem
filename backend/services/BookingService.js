class BookingService {
  constructor(BookingModel) {
    this.Booking = BookingModel;
  }

  async createBooking(data, userId) {
    return await this.Booking.create({
      ...data,
      userId,
    });
  }

  async getUserBookings(userId) {
    return await this.Booking.find({ userId });
  }
}

module.exports = BookingService;