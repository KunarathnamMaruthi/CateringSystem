const Menu =
  require("../models/Menu");

// ================= GET MENUS =================

exports.getMenus =
  async (req, res) => {

    try {

      const menus =
        await Menu.find();

      res.status(200).json(
        menus
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch menu",
      });
    }
  };

// ================= ADD MENU =================

exports.addMenu =
  async (req, res) => {

    try {

      const {

        title,

        description,

        price,

        category,

        offer,

      } = req.body;

      const image =

        req.file

          ? req.file.filename

          : "";

      const menu =
        new Menu({

          title,

          description,

          price,

          category,

          offer,

          image,
        });

      await menu.save();

      res.status(201).json({

        success: true,

        menu,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed To Add Menu",
      });
    }
  };