const BookingFacade =
  require("../Facade/BookingFacade");

exports.createBooking = async (
  req,
  res
) => {

  try {

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const booking =
      await BookingFacade.createBooking({

        ...req.body,

        userId:
          req.user._id,
      });

    return res.status(201).json({
      success: true,
      booking,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Booking creation failed",
    });
  }
};

exports.getBookings = async (
  req,
  res
) => {

  try {

    const bookings =
      await BookingFacade.getBookings();

    return res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

exports.getBooking = async (
  req,
  res
) => {

  try {

    const booking =
      await BookingFacade.getBookingById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      booking,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};

exports.updateBooking = async (
  req,
  res
) => {

  try {

    const booking =
      await BookingFacade.updateBooking(

        req.params.id,

        req.body
      );

    return res.status(200).json({
      success: true,
      booking,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Booking update failed",
    });
  }
};

exports.deleteBooking = async (
  req,
  res
) => {

  try {

    await BookingFacade.deleteBooking(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Booking deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Booking deletion failed",
    });
  }
};