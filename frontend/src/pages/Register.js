import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../api/api";

import "../App.css";

export default function Register() {

  const navigate =
    useNavigate();

  const [data, setData] =
    useState({
      name: "",
      email: "",
      password: "",
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

  // ================= REGISTER =================
  const handleRegister =
    async () => {

      // VALIDATION
      if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.confirmPassword
      ) {

        return alert(
          "Please fill all fields"
        );
      }

      // EMAIL CHECK
      if (
        !data.email.includes("@")
      ) {

        return alert(
          "Enter a valid email"
        );
      }

      // PASSWORD LENGTH
      if (
        data.password.length < 6
      ) {

        return alert(
          "Password must be at least 6 characters"
        );
      }

      // PASSWORD MATCH
      if (
        data.password !==
        data.confirmPassword
      ) {

        return alert(
          "Passwords do not match"
        );
      }

      try {

        setLoading(true);

        const res =
          await API.post(
            "/users/register",
            {
              name: data.name,
              email: data.email,
              password:
                data.password,
            }
          );

        console.log(
          res.data
        );

        alert(
          "Registered Successfully!"
        );

        navigate("/login");

      } catch (err) {

        console.error(
          err.response?.data ||
          err.message
        );

        alert(
          err.response?.data?.message ||
          "Register failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="page-container">

      <div className="auth-wrapper">

        <div className="auth-card">

          <h1>
            Create Account 🚀
          </h1>

          <p>
            Register to start booking catering services
          </p>

          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleChange}
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={data.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            value={data.password}
            onChange={handleChange}
          />

          {/* CONFIRM PASSWORD */}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={data.confirmPassword}
            onChange={handleChange}
          />

          {/* BUTTON */}

          <button
            className="btn-green"
            onClick={handleRegister}
            disabled={loading}
          >

            {loading
              ? "Registering..."
              : "Register"}

          </button>

          {/* LOGIN */}

          <p className="auth-link">

            Already have an account?

            <span
              onClick={() =>
                navigate("/login")
              }
            >
              Login Here
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}