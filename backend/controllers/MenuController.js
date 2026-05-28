const Menu = require("../models/Menu");

// ================= GET MENUS =================
const getMenus = async (req, res) => {

  try {

    const menus = await Menu.find();

    res.status(200).json({
      success: true,
      menus,
    });

  } catch (error) {

    console.error("GET MENUS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch menus",
    });
  }
};

// ================= ADD MENU =================
const addMenu = async (req, res) => {

  try {

    const menu = new Menu({

      name: req.body.name,

      category: req.body.category,

      price: req.body.price,

      offer: req.body.offer,

      description: req.body.description,

      image: req.file
        ? req.file.filename
        : "",
    });

    await menu.save();

    res.status(201).json({
      success: true,
      menu,
    });

  } catch (error) {

    console.error("ADD MENU ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add menu",
    });
  }
};

module.exports = {
  getMenus,
  addMenu,
};