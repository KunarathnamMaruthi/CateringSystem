const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const UserFactory =
  require("../factories/UserFactory");

// ================= REGISTER USER =================

exports.registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        phone,
        role,
      } = req.body;

      // CHECK USER

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res.status(400).json({
          success: false,
          message:
            "User already exists",
        });
      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // FACTORY PATTERN

      const userData =
        UserFactory.createUser(
          role || "customer",
          {
            name,
            email,
            phone,
          }
        );

      // SAVE USER

      const user =
        await User.create({

          ...userData,

          password:
            hashedPassword,
        });

      // TOKEN

      const token =
        jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

      res.status(201).json({
        success: true,
        message:
          "User registered successfully",
        token,
        user,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Registration failed",
      });
    }
  };

// ================= LOGIN USER =================

exports.loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

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

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(401).json({
          success: false,
          message:
            "Invalid credentials",
        });
      }

      const token =
        jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

      res.status(200).json({
        success: true,
        token,
        user,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Login failed",
      });
    }
  };

// ================= GET USERS =================

exports.getUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password");

      res.status(200).json({
        success: true,
        users,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch users",
      });
    }
  };