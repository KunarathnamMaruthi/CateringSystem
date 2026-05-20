const express = require("express");

const router = express.Router();

const {
  getMenus,
  addMenu,
} = require("../controllers/MenuController");

router.get("/", getMenus);

router.post("/", addMenu);

module.exports = router;