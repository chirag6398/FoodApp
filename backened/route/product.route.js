var productRoute=require("express").Router();
var productController=require("../controller/product.js");
var passport=require("passport");
const multer = require("multer");
var passportJwt=require("../passport/passportjwt");

passportJwt.initializer(passport);

const uploadProductImg = multer({
    limits: {
      fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return new Error("file not supported");
      }
      cb(undefined, true);
    },
  });

productRoute.post("/api/product/addProduct",uploadProductImg.single("image"),productController.addProduct);

module.exports=productRoute;