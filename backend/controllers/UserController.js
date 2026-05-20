
const User =
  require("../models/User");

const jwt =
  require("jsonwebtoken");

// ================= GENERATE TOKEN =================
const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ================= REGISTER USER =================
exports.registerUser =
  async (req, res) => {

    try {

      console.log(
        "REGISTER API HIT"
      );

      const {
        name,
        email,
        password,
      } = req.body;

      console.log(
        "DATA RECEIVED:",
        name,
        email
      );

      // VALIDATION
      if (
        !name ||
        !email ||
        !password
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Please fill all fields",
        });
      }

      // CHECK USER
      const existingUser =
        await User.findOne({
          email,
        });

      console.log(
        "CHECKED EXISTING USER"
      );

      if (existingUser) {

        return res.status(400).json({
          success: false,
          message:
            "User already exists",
        });
      }

      // CREATE USER
      const user =
        await User.create({
          name,
          email,
          password,
        });

      console.log(
        "USER CREATED SUCCESSFULLY"
      );

      res.status(201).json({
        success: true,
        message:
          "Registration successful",

        token:
          generateToken(
            user._id
          ),

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin:
            user.isAdmin,
        },
      });

    } catch (error) {

      console.error(
        "REGISTER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Registration failed",
        error:
          error.message,
      });
    }
  };

// ================= LOGIN USER =================
exports.loginUser =
  async (req, res) => {

    try {

      console.log(
        "LOGIN API HIT"
      );

      const {
        email,
        password,
      } = req.body;

      // VALIDATION
      if (
        !email ||
        !password
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Please fill all fields",
        });
      }

      // FIND USER
      const user =
        await User.findOne({
          email,
        }).select("+password");

      if (!user) {

        return res.status(401).json({
          success: false,
          message:
            "Invalid email or password",
        });
      }

      // CHECK PASSWORD
      const isMatch =
        await user.matchPassword(
          password
        );

      if (!isMatch) {

        return res.status(401).json({
          success: false,
          message:
            "Invalid email or password",
        });
      }

      res.json({
        success: true,
        message:
          "Login successful",

        token:
          generateToken(
            user._id
          ),

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin:
            user.isAdmin,
        },
      });

    } catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Login failed",
        error:
          error.message,
      });
    }
  };

// ================= FORGOT PASSWORD =================
exports.forgotPassword =
  async (req, res) => {

    try {

      const { email } =
        req.body;

      if (!email) {

        return res.status(400).json({
          success: false,
          message:
            "Please enter email",
        });
      }

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      res.json({
        success: true,
        message:
          "Password reset link sent (demo)",
      });

    } catch (error) {

      console.error(
        "FORGOT PASSWORD ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Forgot password failed",
      });
    }
  };