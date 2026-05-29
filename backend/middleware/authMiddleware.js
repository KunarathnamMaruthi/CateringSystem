const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const authMiddleware =
  async (
    req,
    res,
    next
  ) => {

    try {

      const authHeader =
        req.headers.authorization;

      // CHECK TOKEN

      if (
        !authHeader ||
        !authHeader.startsWith(
          "Bearer "
        )
      ) {

        return res.status(401).json({
          success: false,
          message:
            "Access denied",
        });
      }

      // EXTRACT TOKEN

      const token =
        authHeader.split(
          " "
        )[1];

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
        ).select(
          "-password"
        );

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      // STORE USER

      req.user = user;

      next();

    } catch (error) {

      console.error(error);

      return res.status(401).json({
        success: false,
        message:
          "Invalid token",
      });
    }
  };

module.exports =
  authMiddleware;