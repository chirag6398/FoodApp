var brandRoute = require("express").Router();
var brandController = require("../controller/brand.js");
var passport = require("passport");
var multer = require("multer");

var passportJwt = require("../passport/passportjwt");

passportJwt.initializer(passport);

const uploadProductImg = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return new Error("file not supported");
    }
    cb(undefined, true);
  },
});

brandRoute.get(
  "/api/brand/getBrands/:limit/:page",
  passport.authenticate("jwt", { session: false }),
  brandController.getBrands
);
brandRoute.get(
  "/api/brand/getBrand/:id",
  passport.authenticate("jwt", { session: false }),
  brandController.getBrand
);

brandRoute.get(
  "/api/brand/searchBrandBySearchText/:searchText",
  passport.authenticate("jwt", { session: false }),
  brandController.searchBrandBySearchText
);

brandRoute.post(
  "/api/brand/createBrand",
  uploadProductImg.single("file"),
  brandController.createBrand
);
brandRoute.post(
  "/api/brand/changeLogo",
  uploadProductImg.single("file"),
  brandController.changeLogo
);

brandRoute.post(
  "/api/brand/updateBrandName",
  passport.authenticate("jwt", { session: false }),
  brandController.updateBrandName
);

brandRoute.put(
  "/api/brand/deactivateBrand",
  passport.authenticate("jwt", { session: false }),
  brandController.deactivateBrand
);
brandRoute.put(
  "/api/brand/activateBrand",
  passport.authenticate("jwt", { session: false }),
  brandController.activateBrand
);
brandRoute.post(
  "/api/brand/deleteBrand",
  passport.authenticate("jwt", { session: false }),
  brandController.deleteBrand
);

module.exports = brandRoute;
