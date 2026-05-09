import { useState } from "react";
import API from "../api/api";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
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
<<<<<<< HEAD
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
=======
      await API.post("/users/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Register failed");
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
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

<<<<<<< HEAD
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
=======
        <button onClick={handleRegister}>Register</button>
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
      </div>
    </div>
  );
}

export default Register;