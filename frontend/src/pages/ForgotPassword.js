import { useState } from "react";
import API from "../api/api";

export default function ForgotPassword() {
  const [data, setData] = useState({
    email: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleReset = async () => {
    try {
      if (!data.email || !data.newPassword) {
        return alert("Please fill all fields");
      }

      setLoading(true);

      const res = await API.post("/users/forgot-password", data);

      alert(res.data.message);

      setData({ email: "", newPassword: "" });

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Forgot Password</h2>

        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={data.newPassword}
          onChange={handleChange}
        />

        <button onClick={handleReset} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}