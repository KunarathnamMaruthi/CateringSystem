const express = require("express");
const multer = require("multer");
const path = require("path");

const Menu = require("../models/Menu");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Get all menus
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menus",
    });
  }
});

// Add menu with image upload
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, category, price, description } =
        req.body;

      const imageUrl = req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : "";

      const newMenu = new Menu({
        name,
        category,
        price,
        description,
        imageUrl,
      });

      await newMenu.save();

      res.status(201).json(newMenu);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to add menu",
      });
    }
  }
);

// Delete menu
router.delete("/:id", async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);

    res.json({
      message: "Menu deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete menu",
    });
  }
});

module.exports = router;