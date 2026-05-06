const express = require("express");
const router = express.Router();

const User = require("../models/user");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: err.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).json({ message: "User not found" });

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

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;