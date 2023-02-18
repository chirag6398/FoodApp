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

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// var upload = multer({ storage: storage });

productRoute.post("/api/product/addProduct",uploadProductImg.single("file"),productController.addProduct);

module.exports=productRoute;