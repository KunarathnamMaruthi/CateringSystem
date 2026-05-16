import { useState } from "react";
import API from "../api/api";

import "../App.css";

export default function Booking() {
  const [step, setStep] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    guests: 0,
    eventDate: "",
    category: "",
    time: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !data.name ||
      !data.email ||
      !data.guests ||
      !data.eventDate ||
      !data.category
    ) {
      alert(
        "Please fill all required fields"
      );

      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      setLoading(true);

      console.log(data);

      const res = await API.post(
        "/bookings",
        data
      );

      console.log(
        "SUCCESS:",
        res.data
      );

      alert(
        "Booking Submitted Successfully!"
      );

      setData({
        name: "",
        email: "",
        phone: "",
        address: "",
        guests: 0,
        eventDate: "",
        category: "",
        time: "",
        status: "pending",
      });

      setStep(1);

    } catch (err) {
      console.log(
        "ERROR:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
          "Booking failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Booking Here</h2>

        {step === 1 && (
          <>
            <input
              name="name"
              placeholder="Full Name"
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

            <button
              onClick={() =>
                setStep(2)
              }
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <select
              name="guests"
              value={data.guests}
              onChange={handleChange}
            >
              <option value="">
                Select Guests
              </option>

              <option value="50">
                50
              </option>

              <option value="100">
                100
              </option>

              <option value="150">
                150
              </option>

              <option value="200">
                200
              </option>
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
              <option value="">
                Select Category
              </option>

              <option value="Wedding">
                Wedding
              </option>

              <option value="Birthday">
                Birthday
              </option>

              <option value="Corporate">
                Corporate
              </option>
            </select>

            <input
              type="time"
              name="time"
              value={data.time}
              onChange={handleChange}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  setStep(1)
                }
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}