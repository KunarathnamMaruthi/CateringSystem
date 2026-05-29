const express =
  require("express");

const router =
  express.Router();

const multer =
  require("multer");

const path =
  require("path");

const {

  getMenus,

  addMenu,

} = require(
  "../controllers/MenuController"
);

// STORAGE

const storage =
  multer.diskStorage({

    destination:
      function (
        req,
        file,
        cb
      ) {

        cb(

          null,

          path.join(
            __dirname,
            "../../uploads"
          )
        );
      },

    filename:
      function (
        req,
        file,
        cb
      ) {

        cb(

          null,

          Date.now() +

          path.extname(
            file.originalname
          )
        );
      },
  });

const upload =
  multer({
    storage,
  });

// ROUTES

router.get(
  "/",
  getMenus
);

router.post(

  "/",

  upload.single("image"),

  addMenu
);

module.exports =
  router;