const User =
  require("../models/User");

// ================= GET PROFILE =================
exports.getProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      res.json({
        success: true,
        user,
      });

    } catch (error) {

      console.error(
        "GET PROFILE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch profile",
      });
    }
  };

// ================= UPDATE PROFILE =================
exports.updateProfile =
  async (req, res) => {

    try {

      const {
        name,
        phone,
        address,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      // UPDATE FIELDS
      user.name =
        name || user.name;

      user.phone =
        phone || user.phone;

      user.address =
        address || user.address;

      // SAVE USER
      const updatedUser =
        await user.save();

      res.json({
        success: true,
        message:
          "Profile updated successfully",

        user: {
          id:
            updatedUser._id,

          name:
            updatedUser.name,

          email:
            updatedUser.email,

          phone:
            updatedUser.phone,

          address:
            updatedUser.address,

          isAdmin:
            updatedUser.isAdmin,
        },
      });

    } catch (error) {

      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update profile",
      });
    }
  };