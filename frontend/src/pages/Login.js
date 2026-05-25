import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../api/api";

import "../App.css";

export default function Login() {

  const navigate =
    useNavigate();

  const [data, setData] =
    useState({
      email: "",
      password: "",
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

  // ================= LOGIN =================
  const handleLogin =
    async () => {

      // VALIDATION
      if (
        !data.email ||
        !data.password
      ) {

        return alert(
          "Please enter email and password"
        );
      }

      try {

        setLoading(true);

        const res =
          await API.post(
            "/users/login",
            data
          );

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          res.data.token
        );

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        alert(
          "Login successful"
        );

        // REDIRECT
        if (
          res.data.user?.isAdmin
        ) {

          navigate("/admin");

        } else {

          navigate("/booking");
        }

      } catch (err) {

        console.log(
          "LOGIN ERROR:",
          err.response?.data
        );

        alert(
          err.response?.data?.message ||
          "Invalid email or password"
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
            Welcome Back 
          </h1>

          <p>
            Login to continue booking catering services
          </p>

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
            autoComplete="current-password"
            value={data.password}
            onChange={handleChange}
          />

          {/* LOGIN BUTTON */}

          <button
            className="btn-green"
            onClick={handleLogin}
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

          {/* REGISTER */}

          <p className="auth-link">

            Don't have an account?

            <span
              onClick={() =>
                navigate("/register")
              }
            >
              Register Here
            </span>

          </p>

          {/* FORGOT PASSWORD */}

          <p className="auth-link">

            Forgot Password?

            <span
              onClick={() =>
                navigate(
                  "/forgot-password"
                )
              }
            >
              Reset Here
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}