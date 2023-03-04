var mongoose = require("mongoose");

var SuperCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  logo: {
    type: String,
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("supercategory", SuperCategorySchema);
