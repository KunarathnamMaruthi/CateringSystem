const express =
  require("express");

const cors =
  require("cors");

const dotenv =
  require("dotenv");

const path =
  require("path");

dotenv.config();

const app =
  express();

// DATABASE

const database =
  require(
    "./config/DatabaseSingleton"
  );

database.connect();

// MIDDLEWARE

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// STATIC FOLDER

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "../uploads"
    )
  )
);
// ROUTES

const userRoutes =
  require(
    "./routes/userRoutes"
  );

const bookingRoutes =
  require(
    "./routes/bookingRoutes"
  );

const menuRoutes =
  require(
    "./routes/menuRoutes"
  );

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/menu",
  menuRoutes
);

// TEST ROUTE

app.get(
  "/",
  (req, res) => {

    res.send(
      "Catering API Running Successfully"
    );
  }
);

// PORT

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );
  }
);