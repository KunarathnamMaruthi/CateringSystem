import { useEffect, useState } from "react";
import API from "../api/api";

export default function Admin() {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔒 Protect admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token || !user?.isAdmin) {
      window.location.href = "/login";
    }
  }, []);

  // 🔹 FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err.response?.data);
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔹 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      await API.put(`/bookings/${id}`, { status });
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DELETE
  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      setLoading(true);
      await API.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 EDIT
  const editBooking = (booking) => {
    setEditData(booking);
  };

  const updateBooking = async () => {
    if (!editData.name || !editData.email) {
      return alert("Name & Email required");
    }

    try {
      setLoading(true);

      await API.put(`/bookings/${editData._id}`, {
        ...editData,
        guests: Number(editData.guests),
      });

      alert("Updated successfully");
      setEditData(null);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Admin Dashboard</h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p>Loading...</p>}

        {/* EDIT FORM */}
        {editData && (
          <div className="card">
            <h3>Edit Booking</h3>

            <input
              value={editData.name || ""}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />

            <input
              value={editData.email || ""}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />

            <input
              value={editData.guests || ""}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  guests: Number(e.target.value),
                })
              }
            />

            <button onClick={updateBooking}>Save</button>
            <button onClick={() => setEditData(null)}>Cancel</button>
          </div>
        )}

        {/* STATS */}
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

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Guests</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings
              .filter((b) =>
                (b.name + b.email)
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((b) => (
                <tr key={b._id}>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.guests}</td>
                  <td>
                    {b.eventDate
                      ? new Date(b.eventDate).toLocaleDateString("en-AU")
                      : "-"}
                  </td>

                  <td
                    style={{
                      color:
                        b.status === "approved"
                          ? "green"
                          : b.status === "cancelled"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {b.status}
                  </td>

                  <td>
                    <button onClick={() => updateStatus(b._id, "approved")}>
                      Approve
                    </button>

                    <button onClick={() => updateStatus(b._id, "cancelled")}>
                      Cancel
                    </button>

                    <button onClick={() => editBooking(b)}>Edit</button>

                    <button onClick={() => deleteBooking(b._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}