var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["dine-in", "take-away"],
    },
    tableNumber: [
      {
        type: Number,
        required: function () {
          return this.type === "dine-in";
        },
      },
    ],
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
      enum: [
        "preparing",
        "pending",
        "cancelled",
        "serving",
        "served",
        "completed",
      ],
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

OrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("order", OrderSchema);
