const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

// ================= AUTH MIDDLEWARE =================
module.exports =
  async (req, res, next) => {

    try {

      const header =
        req.headers.authorization;

      // CHECK TOKEN
      if (
        !header ||
        !header.startsWith(
          "Bearer "
        )
      ) {

        return res.status(401).json({
          success: false,
          message:
            "No token provided",
        });
      }

      // GET TOKEN
      const token =
        header.split(" ")[1];

      // VERIFY TOKEN
      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      // FIND USER
      const user =
        await User.findById(
          decoded.id
        ).select("-password");

      if (!user) {

        return res.status(401).json({
          success: false,
          message:
            "User not found",
        });
      }

      // ATTACH USER
      req.user = user;

      next();

    } catch (error) {

      console.error(
        "AUTH ERROR:",
        error
      );

      return res.status(401).json({
        success: false,
        message:
          "Invalid token",
      });
    }
  };