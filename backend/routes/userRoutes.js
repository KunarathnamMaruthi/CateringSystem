const express = require("express");
const router = express.Router();
<<<<<<< HEAD

const User = require("../models/user");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
<<<<<<< HEAD
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: err.message });
=======
    const { name, email, password } = req.body;
=======

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
>>>>>>> faed3db (Save remaining changes)

    res.status(201).json({
      message: "User registered",
      user,
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: err.message,
    });
<<<<<<< HEAD

    res.json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).json({ message: "User not found" });
=======
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const match =
      await user.matchPassword(password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }
>>>>>>> faed3db (Save remaining changes)

<<<<<<< HEAD
  const match = await user.matchPassword(password);

  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  });
});

// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
=======
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });

<<<<<<< HEAD
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


// ================= RESET PASSWORD =================
router.put('/reset-password', async (req, res) => {
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword; // 🔥 auto-hashed
    await user.save();

    res.json({ message: "Password reset successful" });

<<<<<<< HEAD
  } catch (err) {
    res.status(500).json({ message: err.message });
=======
  } catch (error) {
    console.error("RESET ERROR:", error);
    res.status(500).json({ message: error.message });
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
=======
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
>>>>>>> faed3db (Save remaining changes)
  }
});

module.exports = router;