import { useState } from "react";
import API from "../api/api";
import "../App.css";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    guests: "",
    eventDate: "",
    category: "",
    time: "",
    status: "pending"
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // ✅ validation
      if (!data.name || !data.email || !data.guests || !data.eventDate) {
        return alert("Please fill all required fields");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        return alert("Please login first");
      }

      setLoading(true);

      const res = await API.post("/bookings", {
        ...data,
        guests: Number(data.guests)
      });

      console.log("SUCCESS:", res.data);
      alert("Booking Submitted Successfully!");

      // reset form
      setData({
        name: "",
        email: "",
        phone: "",
        address: "",
        guests: "",
        eventDate: "",
        category: "",
        time: "",
        status: "pending"
      });

      setStep(1);

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Booking Here!</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone"
              value={data.phone}
              onChange={handleChange}
            />

            <input
              name="address"
              placeholder="Address"
              value={data.address}
              onChange={handleChange}
            />

            <button onClick={() => setStep(2)}>Next</button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <select
              name="guests"
              value={data.guests}
              onChange={handleChange}
            >
              <option value="">Guests</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
            </select>

            <input
              type="date"
              name="eventDate"
              value={data.eventDate}
              onChange={handleChange}
            />

            <select
              name="category"
              value={data.category}
              onChange={handleChange}
            >
              <option value="">Category</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
            </select>

            <input
              name="time"
              placeholder="Time (e.g. 6:00 PM)"
              value={data.time}
              onChange={handleChange}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)}>Back</button>

              <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}