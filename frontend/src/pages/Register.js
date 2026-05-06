import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      // ✅ validation
      if (!data.name || !data.email || !data.password) {
        return alert("Please fill all fields");
      }

      if (!data.email.includes("@")) {
        return alert("Enter a valid email");
      }

      if (data.password.length < 6) {
        return alert("Password must be at least 6 characters");
      }

      setLoading(true);

      const res = await API.post("/users/register", data);

      alert("Registered Successfully");

      // 🔥 auto-fill login (optional UX improvement)
      localStorage.setItem(
        "tempUser",
        JSON.stringify({ email: data.email })
      );

      navigate("/login");

    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);

      const message =
        err.response?.data?.message || "Error registering user";

      alert(message);
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
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;