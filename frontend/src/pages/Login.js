import { useState } from "react";

import API from "../api/api";

import { useNavigate } from "react-router-dom";

import "../App.css";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      // Validation
      if (
        !data.email ||
        !data.password
      ) {
        return alert(
          "Please enter email and password"
        );
      }

      setLoading(true);

      const res = await API.post(
        "/users/login",
        data
      );

      // Save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login successful");

      // Redirect based on role
      if (res.data.user?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/booking");
      }

    } catch (err) {
      console.log(
        "LOGIN ERROR:",
        err.response?.data
      );

      const message =
        err.response?.data?.message ||
        "Invalid email or password";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          type="password"
          autoComplete="current-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <span
            onClick={() =>
              navigate("/register")
            }
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            Register here
          </span>
        </p>

        <p>
          Forgot password?{" "}
          <span
            onClick={() =>
              navigate(
                "/forgot-password"
              )
            }
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            Reset here
          </span>
        </p>
      </div>
    </div>
  );
}