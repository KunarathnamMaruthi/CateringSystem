import { useState } from "react";
import API from "../api/api"; // ✅ correct import
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", data); // ✅ FIXED

      localStorage.setItem("token", res.data.token); // save token
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/booking");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Register here
          </span>
        </p>

        <p>
          Forgot password?{" "}
          <span
            onClick={() => navigate("/forgot-password")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Reset here
          </span>
        </p>
      </div>
    </div>
  );
}