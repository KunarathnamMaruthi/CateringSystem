const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

// DATABASE CONNECTION
connectDB();

// APP
const app = express();

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
  require("./routes/menuRoutes")
);

// TEST ROUTE
app.get("/", (req, res) => {

  res.send("API running...");

});

// START SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
