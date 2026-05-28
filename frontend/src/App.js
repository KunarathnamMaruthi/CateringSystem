import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Admin from "./pages/Admin";
import MenuPage from "./pages/MenuPage";

import "./App.css";

function App() {

  // CHECK LOGIN

  const token =
    localStorage.getItem("token");

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";
  };

  return (

    <BrowserRouter>

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        {/* LOGO */}

        <div className="logo">
          Eventbite 🍽️
        </div>

        {/* LINKS */}

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/menu">
            Menu
          </Link>

          <Link to="/booking">
            Booking
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          {JSON.parse(localStorage.getItem("user"))?.isAdmin && (

  <Link to="/admin">
    Admin
  </Link>

)}

          {/* LOGIN / LOGOUT */}

          {token ? (

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          ) : (

            <Link to="/login">
              Login
            </Link>

          )}

        </div>

      </nav>

      {/* ================= ROUTES ================= */}

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* MENU */}

        <Route
          path="/menu"
          element={<MenuPage />}
        />

        {/* BOOKING */}

        <Route
          path="/booking"
          element={<Booking />}
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* FORGOT PASSWORD */}

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;