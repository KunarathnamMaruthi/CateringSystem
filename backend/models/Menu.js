const mongoose =
  require("mongoose");

// ================= MENU SCHEMA =================

const menuSchema =
  new mongoose.Schema(

    {

      title: {
        type: String,
        required: true,
        trim: true,
      },

      category: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      offer: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        default: "",
      },

    },

    {
      timestamps: true,
    }
  );

// ================= EXPORT =================

const Menu =
  mongoose.model(
    "Menu",
    menuSchema
  );

module.exports =
  Menu;