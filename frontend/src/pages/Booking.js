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
    // ALIDATION (IMPORTANT)
    if (!data.name || !data.email || !data.guests || !data.date || !data.category) {
      alert("Please fill all required fields");
      return;
    }

    try {
<<<<<<< HEAD
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
=======
      await API.post("/bookings", data);

      alert("Booking Submitted Successfully!");

<<<<<<< HEAD
      // ✅ RESET FORM
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
=======
      //  RESET FORM
>>>>>>> faed3db (Save remaining changes)
      setData({
        name: "",
        email: "",
        phone: "",
        address: "",
<<<<<<< HEAD
        guests: "",
        eventDate: "",
=======
        street: "",
        postal: "",
        guests: "",
        date: "",
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
        category: "",
        time: "",
        status: "pending"
      });

      setStep(1);

    } catch (err) {
<<<<<<< HEAD
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
=======
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed");
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Booking Here!</h2>

        {step === 1 && (
          <>
<<<<<<< HEAD
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
=======
            <input name="name" placeholder="Full Name" value={data.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={data.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={data.phone} onChange={handleChange} />
            <input name="address" placeholder="Address" value={data.address} onChange={handleChange} />
            <input name="street" placeholder="Street Address" value={data.street} onChange={handleChange} />
            <input name="postal" placeholder="Postal Code" value={data.postal} onChange={handleChange} />
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b

            <button onClick={() => setStep(2)}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
<<<<<<< HEAD
            <select
              name="guests"
              value={data.guests}
              onChange={handleChange}
            >
              <option value="">Guests</option>
=======
            <select name="guests" value={data.guests} onChange={handleChange}>
              <option value="">Select Guests</option>
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
<<<<<<< HEAD
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
=======
              <option value="250">250</option>
              <option value="350">350</option>
            </select>

            <input type="date" name="date" value={data.date} onChange={handleChange} />

            <select name="category" value={data.category} onChange={handleChange}>
              <option value="">Event Category</option>
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
            </select>

<<<<<<< HEAD
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
=======
             
              <label>Select Time:</label> 
              <input type="time" name="time" value={data.time} onChange={handleChange} />

          

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)}>Back</button>
              <button onClick={handleSubmit}>Submit</button>
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
            </div>
          </>
        )}
      </div>
    </div>
  );
}