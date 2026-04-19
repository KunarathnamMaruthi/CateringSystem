import { useEffect, useState } from "react";
import API from "../api/api";

export default function Admin() {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [editData, setEditData] = useState(null);

  // 🔹 FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 LOAD DATA
  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔹 UPDATE STATUS
  const updateStatus = async (id, status) => {
    await API.put(`/bookings/${id}`, { status });
    fetchBookings();
  };

  // 🔹 DELETE
  const deleteBooking = async (id) => {
    await API.delete(`/bookings/${id}`);
    fetchBookings();
  };

  // 🔹 OPEN EDIT
  const editBooking = (booking) => {
    setEditData(booking);
  };

  // 🔹 SAVE EDIT
  const updateBooking = async () => {
    await API.put(`/bookings/${editData._id}`, editData);
    alert("Updated successfully");
    setEditData(null);
    fetchBookings();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Admin Dashboard</h2>

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        />

        {/* ✏️ EDIT FORM */}
        {editData && (
          <div className="card" style={{ marginBottom: "20px" }}>
            <h3>Edit Booking</h3>

            <input
              value={editData.name || ""}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              value={editData.email || ""}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              placeholder="Email"
            />

            <input
              value={editData.phone || ""}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
              placeholder="Phone"
            />

            <input
              value={editData.address || ""}
              onChange={(e) =>
                setEditData({ ...editData, address: e.target.value })
              }
              placeholder="Address"
            />

            <input
              value={editData.category || ""}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              placeholder="Event"
            />

            <input
              type="date"
              value={
                editData.eventDate
                  ? editData.eventDate.substring(0, 10)
                  : ""
              }
              onChange={(e) =>
                setEditData({ ...editData, eventDate: e.target.value })
              }
            />

            <input
              value={editData.time || ""}
              onChange={(e) =>
                setEditData({ ...editData, time: e.target.value })
              }
              placeholder="Time"
            />

            <input
              value={editData.guests || ""}
              onChange={(e) =>
                setEditData({ ...editData, guests: e.target.value })
              }
              placeholder="Guests"
            />

            <button onClick={updateBooking}>Save</button>
            <button onClick={() => setEditData(null)}>Cancel</button>
          </div>
        )}

        {/* 📊 STATS */}
        <div className="stats">
          <div>Total: {bookings.length}</div>
          <div>
            Approved: {bookings.filter(b => b.status === "approved").length}
          </div>
          <div>
            Pending: {bookings.filter(b => b.status === "pending").length}
          </div>
          <div>
            Cancelled: {bookings.filter(b => b.status === "cancelled").length}
          </div>
        </div>

        {/* 📋 BOOKINGS TABLE */}
        <h3>All Bookings</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings
              .filter((b) =>
                (b.name || "")
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((b) => (
                <tr key={b._id}>
                  <td>{b.name || "-"}</td>
                  <td>{b.email || "-"}</td>
                  <td>{b.phone || "-"}</td>
                  <td>{b.address || "-"}</td>
                  <td>{b.category || "-"}</td>

                  {/* ✅ FIXED DATE */}
                  <td>
                    {b.eventDate
                      ? new Date(b.eventDate).toLocaleDateString("en-AU")
                      : b.date
                      ? new Date(b.date).toLocaleDateString("en-AU")
                      : "-"}
                  </td>

                  <td>{b.time || "-"}</td>
                  <td>{b.guests || "-"}</td>

                  {/* STATUS */}
                  <td
                    className={
                      b.status === "approved"
                        ? "status-approved"
                        : b.status === "cancelled"
                        ? "status-cancelled"
                        : "status-pending"
                    }
                  >
                    {b.status || "pending"}
                  </td>

                  {/* BUTTONS */}
                  <td>
                    <div className="button-group">
                      <button
                        className="btn btn-approve"
                        onClick={() => updateStatus(b._id, "approved")}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-cancel"
                        onClick={() => updateStatus(b._id, "cancelled")}
                      >
                        Cancel
                      </button>

                      <button
                        className="btn btn-edit"
                        onClick={() => editBooking(b)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-delete"
                        onClick={() => deleteBooking(b._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}