const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// ROUTES
const menuRoutes = require("./routes/menuRoutes");

// CONFIG
dotenv.config();

// APP
const app = express();

// DATABASE CONNECTION
connectDB();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);

// ROUTES
app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.use(
  "/api/bookings",
  require("./routes/bookingRoutes")
);

app.use(
  "/api/menu",
  menuRoutes
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Eventbite Catering API Running...");
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});