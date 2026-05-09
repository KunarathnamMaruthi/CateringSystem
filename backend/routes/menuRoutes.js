const express = require("express");
const multer = require("multer");
const path = require("path");

const Menu = require("../models/Menu");

const router = express.Router();

// ================= MULTER STORAGE =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });


// ================= GET ALL MENUS =================
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find()
      .sort({ createdAt: -1 });

    res.json(menus);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menus",
    });
  }
});


// ================= CREATE MENU =================
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        name,
        category,
        price,
        description,
      } = req.body;

      // ✅ AWS Public IP
      const imageUrl = req.file
        ? `http://3.27.213.247:5000/uploads/${req.file.filename}`
        : "";

      const newMenu = new Menu({
        name,
        category,
        price,
        description,
        imageUrl,
      });

      await newMenu.save();

      res.status(201).json({
        message: "Menu added successfully",
        menu: newMenu,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to add menu",
      });
    }
  }
);


// ================= DELETE MENU =================
router.delete("/:id", async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);

    res.json({
      message: "Menu deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete menu",
    });
  }
});

module.exports = router;