import {
  useEffect,
  useState,
} from "react";

import API from "../api/api";

import "../App.css";

export default function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [actionLoading, setActionLoading] =
    useState(false);

  // ================= FETCH BOOKINGS =================
  const fetchBookings =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.get(
            "/bookings"
          );

        setBookings(
          res.data.bookings || []
        );

      } catch (err) {

        console.log(
          "FETCH ERROR:",
          err.response?.data
        );

        alert(
          "Failed to fetch bookings"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ================= DELETE =================
  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Cancel this booking?"
        )
      ) {
        return;
      }

      try {

        setActionLoading(true);

        await API.delete(
          `/bookings/${id}`
        );

        alert(
          "Booking cancelled"
        );

        fetchBookings();

      } catch (err) {

        console.log(
          "DELETE ERROR:",
          err.response?.data
        );

        alert(
          err.response?.data?.message ||
          "Delete failed"
        );

      } finally {

        setActionLoading(false);
      }
    };

  // ================= EDIT =================
  const handleEdit =
    async (id) => {

      const newGuests =
        prompt(
          "Enter new guest count:"
        );

      if (
        !newGuests ||
        isNaN(newGuests) ||
        Number(newGuests) <= 0
      ) {

        return alert(
          "Please enter a valid number"
        );
      }

      try {

        setActionLoading(true);

        await API.put(
          `/bookings/${id}`,
          {
            guests:
              Number(newGuests),
          }
        );

        alert(
          "Booking updated"
        );

        fetchBookings();

      } catch (err) {

        console.log(
          "UPDATE ERROR:",
          err.response?.data
        );

        alert(
          err.response?.data?.message ||
          "Update failed"
        );

      } finally {

        setActionLoading(false);
      }
    };

  return (

    <div className="page-container">

      <div className="my-bookings-page">

        <h1>
          My Bookings
        </h1>

        <p>
          View and manage your catering reservations
        </p>

        {loading ? (

          <h2>
            Loading...
          </h2>

        ) : bookings.length === 0 ? (

          <div className="empty-box">

            <h2>
              No bookings found
            </h2>

          </div>

        ) : (

          <div className="bookings-grid">

            {bookings.map((b) => (

              <div
                className="booking-card"
                key={b._id}
              >

                <div className="booking-top">

                  <h2>
                    {b.category}
                  </h2>

                  <span
                    className={`status-badge ${b.status}`}
                  >
                    {b.status}
                  </span>

                </div>

                <div className="booking-details">

                  <p>
                    <b>Name:</b>
                    {" "}
                    {b.name}
                  </p>

                  <p>
                    <b>Email:</b>
                    {" "}
                    {b.email}
                  </p>

                  <p>
                    <b>Phone:</b>
                    {" "}
                    {b.phone}
                  </p>

                  <p>
                    <b>Guests:</b>
                    {" "}
                    {b.guests}
                  </p>

                  <p>
                    <b>Date:</b>
                    {" "}

                    {b.eventDate
                      ? new Date(
                          b.eventDate
                        ).toLocaleDateString(
                          "en-AU"
                        )
                      : "-"}

                  </p>

                  <p>
                    <b>Time:</b>
                    {" "}
                    {b.time}
                  </p>

                  <p>
                    <b>Address:</b>
                    {" "}
                    {b.address}
                  </p>

                </div>

                {/* ACTIONS */}

                <div className="booking-buttons">

                  <button
                    className="btn-blue"
                    onClick={() =>
                      handleEdit(
                        b._id
                      )
                    }
                    disabled={actionLoading}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-red"
                    onClick={() =>
                      handleDelete(
                        b._id
                      )
                    }
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}