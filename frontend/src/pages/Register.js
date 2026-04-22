import { useState } from "react";
import API from "../api/api";
import "../App.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/users/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Register Account</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;