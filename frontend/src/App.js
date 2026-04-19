import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <div>

        <nav style={{ marginBottom: "40px", textAlign: "center" }}>
          <Link to="/">Home</Link>{" "}
          <Link to="/booking">Book</Link>{" "}
          <Link to="/mybookings">My Bookings</Link>{" "}
          <Link to="/admin">Admin</Link>{" "}
          <Link to="/login">Login</Link>{" "}
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;