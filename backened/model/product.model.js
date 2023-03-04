var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    //used to find products of perticular category under same brand
    category: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,

        required: true,
      },
      name: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
    superCategory: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,

        required: true,
      },
      name: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
    brand: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,

        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },

    outlet: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
