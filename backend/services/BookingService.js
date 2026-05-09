<<<<<<< HEAD
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

=======
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
    return await this.Booking.find({
      userId,
    }).sort({ createdAt: -1 });
  }
}

>>>>>>> faed3db (Save remaining changes)
module.exports = BookingService;