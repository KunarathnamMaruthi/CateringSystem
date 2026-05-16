import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/api";

import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
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

  const handleRegister = async () => {
    try {
      // Validation
      if (
        !data.name ||
        !data.email ||
        !data.password
      ) {
        return alert(
          "Please fill all fields"
        );
      }

      if (
        !data.email.includes("@")
      ) {
        return alert(
          "Enter a valid email"
        );
      }

      if (
        data.password.length < 6
      ) {
        return alert(
          "Password must be at least 6 characters"
        );
      }

      setLoading(true);

      const res = await API.post(
        "/users/register",
        data
      );

      alert(
        "Registered Successfully!"
      );

      console.log(res.data);

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
      <div className="card">
        <h2>Register Account</h2>

        <input
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          type="password"
          autoComplete="new-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <span
            onClick={() =>
              navigate("/login")
            }
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;