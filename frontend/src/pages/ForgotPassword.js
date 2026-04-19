import { useState } from "react";
import API from "../api/api";

export default function ForgotPassword() {
  const [data, setData] = useState({
    email: "",
    newPassword: "",
  });

  const handleReset = async () => {
    await API.post("/users/forgot-password", data);
    alert("Password Reset Successful!");
  };

  return (
    <div>
         <div className="page-container">
  <div className="card">
      <h2>Forgot Password</h2>
      <input
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        placeholder="New Password"
        type="password"
        onChange={(e) => setData({ ...data, newPassword: e.target.value })}
      />
      <button onClick={handleReset}>Reset Password</button>
    </div>
    </div>
        </div>
  );
}