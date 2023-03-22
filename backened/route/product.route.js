var productRoute = require("express").Router();
var productController = require("../controller/product.js");
var passport = require("passport");
const multer = require("multer");
var passportJwt = require("../passport/passportjwt");
var validateProduct = require("../service/validation.service").validateProduct;
passportJwt.initializer(passport);

const uploadProductImg = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return new Error("file not supported");
    }
    cb(undefined, true);
  },
});

productRoute.get(
  "/api/product/getSuperCategory/:id",
  productController.getSuperCategory
);

productRoute.post(
  "/api/product/addProduct",
  validateProduct,
  uploadProductImg.single("file"),
  productController.addProduct
);

productRoute.post("/api/product/getProducts", productController.getProducts);

productRoute.post(
  "/api/product/updateProduct",
  uploadProductImg.single("file"),
  productController.updateProduct
);

module.exports = productRoute;
