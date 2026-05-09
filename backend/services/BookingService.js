class BookingService {
  constructor(BookingModel) {
    this.Booking = BookingModel;
  }

  // ================= CREATE BOOKING =================
  async createBooking(data, userId) {
    return await this.Booking.create({
      ...data,
      userId,
    });
  }

  // ================= GET USER BOOKINGS =================
  async getUserBookings(userId) {
    return await this.Booking.find({
      userId,
    }).sort({ createdAt: -1 });
  }

  // ================= UPDATE BOOKING =================
  async updateBooking(id, data) {
    return await this.Booking.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  // ================= DELETE BOOKING =================
  async deleteBooking(id) {
    return await this.Booking.findByIdAndDelete(id);
  }
}

module.exports = BookingService;