var mongoose = require("mongoose");

var OutletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
    outletAdminId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    type: {
      type: String,
      required: true,
      lowercase: true,
    },
    brand: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      logo: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        product: {
          name: {
            type: String,
            trim: true,
            lowercase: true,
          },
          price: {
            type: Number,
            required: true,
          },
          img: {
            type: String,
          },
          description: {
            type: String,
            lowercase: true,
          },
          category: {
            _id: {
              type: mongoose.Schema.Types.ObjectId,
            },
            name: {
              type: String,
              trim: true,
              lowercase: true,
            },
          },
          superCategory: {
            _id: {
              type: mongoose.Schema.Types.ObjectId,
            },
            name: {
              type: String,
              trim: true,
              lowercase: true,
            },
          },
          _id: {
            type: mongoose.Schema.Types.ObjectId,
          },
        },
      },
    ],
    taxes: [
      {
        name: {
          type: String,
          unique: true,
          trim: true,
        },
        percent: {
          type: Number,
        },
      },
    ],
    table: [
      {
        number: {
          type: Number,
          required: true,
          unique: true,
        },
        capacity: {
          type: Number,
          required: true,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contactInfo: {
      number: {
        type: Number,
        unique: true,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        trim: true,
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("outlet", OutletSchema);
