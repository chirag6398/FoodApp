var mongoose = require("mongoose");

var BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      unique: true,
    },
    logo: {
      type: String,
    },
    location: {
      address: {
        type: String,
        required: true,
        lowercase: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
    brandAdminId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    contactInfo: {
      number: {
        type: Number,
        unique: true,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
    },
    description: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
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

module.exports = mongoose.model("brand", BrandSchema);
