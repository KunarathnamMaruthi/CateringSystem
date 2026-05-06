import { useEffect, useState } from "react";
import API from "../api/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // 🔹 Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data);
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔹 Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      setActionLoading(true);
      await API.delete(`/bookings/${id}`);
      alert("Booking cancelled");
      fetchBookings();
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  // 🔹 Edit booking
  const handleEdit = async (id) => {
    const newGuests = prompt("Enter new guest count:");

    // ❌ prevent invalid input
    if (!newGuests || isNaN(newGuests) || Number(newGuests) <= 0) {
      return alert("Please enter a valid number");
    }

    try {
      setActionLoading(true);

      await API.put(`/bookings/${id}`, {
        guests: Number(newGuests),
      });

      alert("Booking updated");
      fetchBookings();
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card" style={{ width: "500px" }}>
        <h2>My Bookings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          bookings.map((b) => (
            <div className="booking-box" key={b._id}>
              <div className="booking-grid">
                <p><b>Name:</b> {b.name}</p>
                <p><b>Email:</b> {b.email}</p>
                <p><b>Phone:</b> {b.phone}</p>
                <p><b>Guests:</b> {b.guests}</p>

                <p>
                  <b>Date:</b>{" "}
                  {b.eventDate
                    ? new Date(b.eventDate).toLocaleDateString("en-AU")
                    : "-"}
                </p>

                <p><b>Time:</b> {b.time}</p>
                <p><b>Category:</b> {b.category}</p>
                <p><b>Address:</b> {b.address}</p>
              </div>

              <div className="booking-actions">
                <button
                  onClick={() => handleEdit(b._id)}
                  disabled={actionLoading}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(b._id)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;