var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var crypt = require("crypto");

var EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
    },
    userType: {
      type: String,
      enum: ["superAdmin", "brandAdmin", "outletAdmin", "outletAgent"],
      required: true,
    },
    outlet: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    brand: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
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

EmployeeSchema.pre("save", function (next) {
  const employee = this;

  if (!employee.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, function (saltError, salt) {
    if (saltError) {
      return next(saltError);
    } else {
      bcrypt.hash(employee.password, salt, function (hashError, hash) {
        if (hashError) {
          return next(hashError);
        }

        employee.password = hash;
        next();
      });
    }
  });
});

EmployeeSchema.methods.generateResetToken = function () {
  console.log("resettokengenerator", this);
  crypt.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    } else {
      this.resetToken = buffer.toString("hex");
      this.expireToken = Date.now() + 3600000;
    }
  });
};

module.exports = mongoose.model("employee", EmployeeSchema);
