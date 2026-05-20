import { useState } from "react";

import API from "../api/api";

import "../App.css";

export default function ForgotPassword() {

  const [data, setData] =
    useState({
      email: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [loading, setLoading] =
    useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= RESET PASSWORD =================
  const handleReset =
    async () => {

      // VALIDATION
      if (
        !data.email ||
        !data.newPassword ||
        !data.confirmPassword
      ) {

        return alert(
          "Please fill all fields"
        );
      }

      // PASSWORD MATCH
      if (
        data.newPassword !==
        data.confirmPassword
      ) {

        return alert(
          "Passwords do not match"
        );
      }

      try {

        setLoading(true);

        const res =
          await API.put(
            "/users/reset-password",
            {
              email: data.email,
              newPassword:
                data.newPassword,
            }
          );

        alert(
          res.data.message
        );

        // RESET FORM
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });

      } catch (err) {

        console.log(
          err.response?.data
        );

        alert(
          err.response?.data?.message ||
          "Reset failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="page-container">

      <div className="card auth-card">

        <h2>
          Reset Password
        </h2>

        <p className="auth-subtitle">
          Enter your email and new password
        </p>

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={data.email}
          onChange={handleChange}
        />

        {/* NEW PASSWORD */}

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={data.newPassword}
          onChange={handleChange}
        />

        {/* CONFIRM PASSWORD */}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={handleChange}
        />

        <button
          className="btn-green"
          onClick={handleReset}
          disabled={loading}
        >

          {loading
            ? "Resetting..."
            : "Reset Password"}

        </button>

      </div>

    </div>
  );
}