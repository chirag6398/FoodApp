var mongoose = require("mongoose");

var OrederSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    items: [
      {
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
        name: {
          type: String,
          required: true,
          lowercase: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        img: {
          type: String,
          required: true,
        },
      },
    ],
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      number: {
        type: Number,
        required: true,
      },
    },
    outlet: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["preparing", "pending", "cancelled", "serving", "served"],
      required: true,
      trim: true,
    },
    brand: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrederSchema);
