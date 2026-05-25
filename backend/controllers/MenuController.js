const Menu =
  require("../models/Menu");

// GET MENUS

const getMenus =
  async (req, res) => {

    try {

      const menus =
        await Menu.find();

      res.json(menus);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ADD MENU

const addMenu =
  async (req, res) => {

    try {

      const menu =
        new Menu({

          name:
            req.body.name,

          category:
            req.body.category,

          price:
            req.body.price,

          offer:
            req.body.offer,

          description:
            req.body.description,

          image:
            req.file
              ? req.file.filename
              : "",
        });

      await menu.save();

      res.status(201).json(
        menu
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getMenus,
  addMenu,
};