import { useState } from "react";
import API from "../api/api";
import "../App.css";

export default function Booking() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    street: "",
    postal: "",
    guests: "",
    date: "",
    category: "",
    time: "",
    status: "pending"
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // ✅ VALIDATION (IMPORTANT)
    if (!data.name || !data.email || !data.guests || !data.date || !data.category) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await API.post("/bookings", data);

      alert("Booking Submitted Successfully!");

      // ✅ RESET FORM
      setData({
        name: "",
        email: "",
        phone: "",
        address: "",
        street: "",
        postal: "",
        guests: "",
        date: "",
        category: "",
        time: "",
        status: "pending"
      });

      setStep(1);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Booking Here!</h2>

        {step === 1 && (
          <>
            <input name="name" placeholder="Full Name" value={data.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={data.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={data.phone} onChange={handleChange} />
            <input name="address" placeholder="Address" value={data.address} onChange={handleChange} />
            <input name="street" placeholder="Street Address" value={data.street} onChange={handleChange} />
            <input name="postal" placeholder="Postal Code" value={data.postal} onChange={handleChange} />

            <button onClick={() => setStep(2)}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <select name="guests" value={data.guests} onChange={handleChange}>
              <option value="">Select Guests</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
              <option value="250">250</option>
              <option value="350">350</option>
            </select>

            <input type="date" name="date" value={data.date} onChange={handleChange} />

            <select name="category" value={data.category} onChange={handleChange}>
              <option value="">Event Category</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
            </select>

             
              <label>Select Time:</label> 
              <input type="time" name="time" value={data.time} onChange={handleChange} />

          

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)}>Back</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}