const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    // Duplicate email check
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Find user
    const user = await User.findOne({ email })
      .select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    //  Compare password
    const match = await user.matchPassword(password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    //  Generate token
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
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= RESET PASSWORD =================
router.put("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    //  Validation
    if (!email || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //  Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //  Update password
    user.password = newPassword;

    await user.save();

    res.json({
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;