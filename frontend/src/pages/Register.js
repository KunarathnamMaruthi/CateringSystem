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

  // HANDLE INPUT

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]:
        e.target.value,
    });
  };

  // REGISTER

  const handleRegister =
    async () => {

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

        await API.post(
          "/users/register",
          {
            name: data.name,
            email: data.email,
            password:
              data.password,
          }
        );

        alert(
          "Registered Successfully!"
        );

        navigate("/login");

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data
            ?.message ||
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
            Create Account
          </h1>

          <p>
            Register to start booking catering services
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={data.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={handleChange}
          />

          <button
            className="btn-green"
            onClick={handleRegister}
          >

            {loading
              ? "Registering..."
              : "Register"}

          </button>

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