import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/api";

import "../App.css";

export default function Profile() {

  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [bookings, setBookings] =
    useState([]);

  const [feedback, setFeedback] =
    useState("");

  const [rating, setRating] =
    useState(0);

  // ================= LOAD USER =================

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      navigate("/login");

      return;
    }

    if (storedUser) {

      setUser(
        JSON.parse(
          storedUser
        )
      );
    }

    fetchBookings();

  }, []);

  // ================= FETCH BOOKINGS =================

  const fetchBookings =
    async () => {

      try {

        const res =
          await API.get(
            "/bookings"
          );

        const bookingData =
          Array.isArray(
            res.data
          )
            ? res.data
            : res.data.bookings ||
              [];

        setBookings(
          bookingData
        );

      } catch (err) {

        console.log(
          err.response?.data
        );

        alert(
          "Failed to fetch bookings"
        );
      }
    };

  // ================= CANCEL =================

  const handleCancel =
    async (id) => {

      try {

        await API.put(
          `/bookings/${id}`,
          {
            status:
              "cancelled",
          }
        );

        alert(
          "Booking cancelled"
        );

        fetchBookings();

      } catch {

        alert(
          "Cancel failed"
        );
      }
    };

  // ================= FEEDBACK =================

  const submitFeedback =
    () => {

      if (!feedback) {

        return alert(
          "Please enter feedback"
        );
      }

      alert(
        "Feedback submitted successfully"
      );

      setFeedback("");

      setRating(0);
    };

  // ================= LOGOUT =================

  const handleLogout =
    () => {

      localStorage.clear();

      navigate("/login");
    };

  // ================= STATUS COLORS =================

  const getStatusClass =
    (status) => {

      switch (status) {

        case "approved":
          return "status-approved";

        case "completed":
          return "status-completed";

        case "cancelled":
          return "status-cancelled";

        default:
          return "status-pending";
      }
    };

  return (

    <div className="profile-page">

      <div className="profile-dashboard">

        {/* PROFILE HEADER */}

        <div className="profile-header">

          <div className="profile-left">

            <div className="profile-avatar">

              {user?.name?.charAt(
                0
              )}

            </div>

            <h1>
              {user?.name}
            </h1>

            <span className="premium-badge">
              Premium User
            </span>

          </div>

          <div className="profile-right">

            <h2>
              User Profile
            </h2>

            <div className="profile-details">

              <p>

                <strong>
                  Name:
                </strong>{" "}

                {user?.name}

              </p>

              <p>

                <strong>
                  Email:
                </strong>{" "}

                {user?.email}

              </p>

              <p>

                <strong>
                  Phone:
                </strong>{" "}

                0412 345 678

              </p>

              <p>

                <strong>
                  Address:
                </strong>{" "}

                Brisbane, Australia

              </p>

            </div>

          </div>

        </div>

        {/* BOOKING HISTORY */}

        <div className="profile-section">

          <div className="section-header">

            <h2>
              Booking History
            </h2>

          </div>

          <table className="profile-table">

            <thead>

              <tr>

                <th>
                  Event
                </th>

                <th>
                  Date
                </th>

                <th>
                  Guests
                </th>

                <th>
                  Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {bookings.map(
                (booking) => (

                  <tr
                    key={
                      booking._id
                    }
                  >

                    <td>
                      {
                        booking.category
                      }
                    </td>

                    <td>

                      {new Date(
                        booking.eventDate
                      ).toLocaleDateString(
                        "en-AU"
                      )}

                    </td>

                    <td>
                      {
                        booking.guests
                      }
                    </td>

                    <td>

                      <span
                        className={`status-badge ${getStatusClass(
                          booking.status
                        )}`}
                      >

                        {
                          booking.status
                        }

                      </span>

                    </td>

                    <td>

                      <div className="profile-actions">

                        <button
                          className="btn-cancel"
                          onClick={() =>
                            handleCancel(
                              booking._id
                            )
                          }
                        >

                          Cancel

                        </button>

                        <button
                          className="btn-feedback"
                        >

                          Feedback

                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {/* ORDER TRACKING */}

        <div className="profile-section">

          <h2>
            Order Tracking
          </h2>

          <div className="tracking-container">

            <div className="tracking-step active">
              Pending
            </div>

            <div className="tracking-line active"></div>

            <div className="tracking-step active">
              Approved
            </div>

            <div className="tracking-line"></div>

            <div className="tracking-step">
              Preparing
            </div>

            <div className="tracking-line"></div>

            <div className="tracking-step">
              Completed
            </div>

          </div>

        </div>

        {/* CANCEL REQUESTS */}

        <div className="profile-section">

          <h2>
            Cancel Requests
          </h2>

          <div className="cancel-box">

            <p>
              No cancel requests
              available.
            </p>

          </div>

        </div>

        {/* FEEDBACK */}

        <div className="profile-section">

          <h2>
            Feedback
          </h2>

          <p>
            Rate your experience
          </p>

          <div className="star-rating">

            {[1, 2, 3, 4, 5].map(
              (star) => (

                <span
                  key={star}
                  className={
                    rating >= star
                      ? "star active-star"
                      : "star"
                  }

                  onClick={() =>
                    setRating(
                      star
                    )
                  }
                >

                  ★

                </span>
              )
            )}

          </div>

          <textarea
            className="feedback-textarea"
            placeholder="Write your feedback..."

            value={feedback}

            onChange={(e) =>
              setFeedback(
                e.target.value
              )
            }
          />

          <button
            className="submit-feedback-btn"

            onClick={
              submitFeedback
            }
          >

            Submit Feedback

          </button>

        </div>

        {/* LOGOUT */}

        <button
          className="logout-btn"

          onClick={
            handleLogout
          }
        >

          Logout

        </button>

      </div>

    </div>
  );
}