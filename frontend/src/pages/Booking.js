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
    status: "pending" // important for admin
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // SUBMIT
  const handleSubmit = async () => {
    try {
      await API.post("/bookings", data);
      alert("Booking Submitted Successfully!");
      setStep(1); // reset form
    } catch (err) {
      console.error(err);
      alert("Error submitting booking");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Booking Here!</h2>
        <p>Join Eventbite Catering</p>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input name="name" placeholder="Full Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="phone" placeholder="Phone" onChange={handleChange} />
            <input name="address" placeholder="Address" onChange={handleChange} />
            <input name="street" placeholder="Street Address" onChange={handleChange} />
            <input name="postal" placeholder="Postal Code" onChange={handleChange} />

            <button onClick={() => setStep(2)}>Next</button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="event-box">
              Event Type: <span>{data.category || "Not selected"}</span>
            </div>

            <select name="guests" onChange={handleChange}>
              <option value="">Select Guests</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
               <option value="200">200</option> 
              <option value="250">250</option>
              <option value="350">350</option>
            </select>

            <input type="date" name="date" onChange={handleChange} />

            <select name="category" onChange={handleChange}>
              <option value="">Event Category</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
            </select>

            <input
              name="time"
              placeholder="Time (e.g. 6:00 PM)"
              onChange={handleChange}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}