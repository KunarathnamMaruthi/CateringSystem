import { useEffect, useState, useCallback } from "react";
import axios from "axios";


function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Fetch bookings
  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        { headers: { Authorization: token } }
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // 🔹 Delete booking
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        { headers: { Authorization: token } }
      );
      alert("Booking cancelled");
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Edit booking
  const handleEdit = async (id) => {
    const newGuests = prompt("Enter new guest count:");
    if (!newGuests) return;

    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { guests: newGuests },
        { headers: { Authorization: token } }
      );
      alert("Booking updated");
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    

    <div className="page-container">
  <div className="card" style={{ width: "500px" }}>
    <h2>My Bookings</h2>

    {bookings.length === 0 ? (
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
    : b.date
    ? new Date(b.date).toLocaleDateString("en-AU")
    : "-"}
</p>
            <p><b>Time:</b> {b.time}</p>

            <p><b>Category:</b> {b.category}</p>
            <p><b>Address:</b> {b.address}</p>
          </div>
<div className="booking-actions">
                <button onClick={() => handleEdit(b._id)}>Edit</button>

                <button onClick={() => handleDelete(b._id)}>
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