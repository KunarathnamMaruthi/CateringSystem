import { useState } from "react";

import API from "../api/api";

import "../App.css";

export default function Booking() {

  // ================= STATES =================

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [data, setData] =
    useState({

     title: "",
      email: "",
      phone: "",
      address: "",
      guests: "",
      eventDate: "",
      category: "",
      time: "",
      status: "pending",
    });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setData({

      ...data,

      [e.target.name]:
        e.target.value,
    });
  };

  // ================= SUBMIT BOOKING =================

  const handleSubmit =
    async () => {

      // VALIDATION

      if (

        !data.title ||
        !data.email ||
        !data.phone ||
        !data.address ||
        !data.guests ||
        !data.eventDate ||
        !data.category ||
        !data.time

      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        // GET TOKEN

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          alert(
            "Please login first"
          );

          return;
        }

        // SEND DATA

        const res =
          await API.post(

            "/bookings/create",

            data,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        console.log(
          res.data
        );

        alert(
          "Booking Submitted Successfully!"
        );

        // RESET FORM

        setData({

          title: "",
          email: "",
          phone: "",
          address: "",
          guests: "",
          eventDate: "",
          category: "",
          time: "",
          status: "pending",
        });

        setStep(1);

      } catch (err) {

        console.log(err);

        alert(

          err.response?.data
            ?.message ||

          "Booking failed"
        );

      } finally {

        setLoading(false);
      }
    };

  // ================= UI =================

  return (

    <div className="page-container">

      <div className="booking-layout">

        {/* ================= LEFT SIDE ================= */}

        <div className="booking-form-card">

          <h1>
            Catering Booking
          </h1>

          <p>
            Book your perfect catering service
          </p>

          {/* ================= STEP 1 ================= */}

          {step === 1 && (

            <>

              <input
                type="text"
                name="title"
                placeholder="Event Title"
                value={data.title}
                onChange={
                  handleChange
                }
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={data.email}
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={data.phone}
                onChange={
                  handleChange
                }
              />

              <textarea
                name="address"
                placeholder="Event Address"
                value={data.address}
                onChange={
                  handleChange
                }
              />

              <button
                className="btn-green"
                onClick={() =>
                  setStep(2)
                }
              >
                Next Step
              </button>

            </>
          )}

          {/* ================= STEP 2 ================= */}

          {step === 2 && (

            <>

              <select
                name="guests"
                value={data.guests}
                onChange={
                  handleChange
                }
              >

                <option value="">
                  Select Guests
                </option>

                <option value="50">
                  50 Guests
                </option>

                <option value="100">
                  100 Guests
                </option>

                <option value="150">
                  150 Guests
                </option>

                <option value="200">
                  200 Guests
                </option>

                <option value="500">
                  500 Guests
                </option>

              </select>

              <input
                type="date"
                name="eventDate"
                value={
                  data.eventDate
                }
                onChange={
                  handleChange
                }
              />

              <select
                name="category"
                value={
                  data.category
                }
                onChange={
                  handleChange
                }
              >

                <option value="">
                  Select Event Type
                </option>

                <option value="Wedding">
                  Wedding Catering
                </option>

                <option value="Birthday">
                  Birthday Party
                </option>

                <option value="Corporate">
                  Corporate Event
                </option>

                <option value="Private">
                  Private Event
                </option>

              </select>

              <input
                type="time"
                name="time"
                value={data.time}
                onChange={
                  handleChange
                }
              />

              <div className="booking-buttons">

                <button
                  className="btn-orange"
                  onClick={() =>
                    setStep(1)
                  }
                >
                  Back
                </button>

                <button
                  className="btn-green"
                  onClick={
                    handleSubmit
                  }
                  disabled={
                    loading
                  }
                >

                  {loading
                    ? "Submitting..."
                    : "Submit Booking"}

                </button>

              </div>

            </>
          )}

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="booking-info-card">

          <h2>
            Why Choose Eventbite?
          </h2>

          <div className="feature-box">
            Professional Catering
          </div>

          <div className="feature-box">
            Fresh Quality Food
          </div>

          <div className="feature-box">
            Fast Delivery
          </div>

          <div className="feature-box">
            Affordable Packages
          </div>

          <div className="feature-box">
            Wedding Specialists
          </div>

        </div>

      </div>

    </div>
  );
}