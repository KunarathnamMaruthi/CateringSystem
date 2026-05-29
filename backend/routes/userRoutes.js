const express =
  require("express");

const router =
  express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
} = require(
  "../controllers/UserController"
);

// REGISTER

router.post(
  "/register",
  registerUser
);

// LOGIN

router.post(
  "/login",
  loginUser
);

// GET USERS

router.get(
  "/all",
  getUsers
);

module.exports =
  router;