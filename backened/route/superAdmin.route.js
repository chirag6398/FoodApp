var superAdminRoute = require("express").Router();
var superAdminController = require("../controller/superAdmin.js");
var passport = require("passport");
var multer = require("multer");

// // var passportLocal=require("../passport/passportLocal");
var passportJwt = require("../passport/passportjwt");

// // passportLocal.initializer(passport);
passportJwt.initializer(passport);

const uploadProductImg = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return new Error("file not supported");
    }
    cb(undefined, true);
  },
});

superAdminRoute.get(
  "/api/superAdmin/getAdminPage",
  passport.authenticate("jwt", { session: false }),
  superAdminController.getAdminPage
);
superAdminRoute.get(
  "/api/superAdmin/getBrands",
  passport.authenticate("jwt", { session: false }),
  superAdminController.getBrands
);
superAdminRoute.get(
  "/api/superAdmin/getBrand/:id",
  passport.authenticate("jwt", { session: false }),
  superAdminController.getBrand
);
superAdminRoute.get(
  "/api/superAdmin/getBrandOutlets",
  passport.authenticate("jwt", { session: false }),
  superAdminController.getBrandOutlets
);
superAdminRoute.get(
  "/api/superAdmin/getSuperCategory",
  passport.authenticate("jwt", { session: false }),
  superAdminController.getSuperCategory
);
superAdminRoute.get(
  "/api/superAdmin/getOutlets",
  passport.authenticate("jwt", { session: false }),
  superAdminController.getOutlets
);

superAdminRoute.post(
  "/api/superAdmin/createBrand",
  uploadProductImg.single("file"),
  superAdminController.createBrand
);

superAdminRoute.post(
  "/api/superAdmin/addBrandAdmin",
  passport.authenticate("jwt", { session: false }),
  superAdminController.addBrandAdmin
);

superAdminRoute.post(
  "/api/superAdmin/updateBrand",
  uploadProductImg.single("file"),
  superAdminController.updateBrand
);

superAdminRoute.post(
  "/api/superAdmin/deactivateBrand",
  passport.authenticate("jwt", { session: false }),
  superAdminController.deactivateBrand
);
superAdminRoute.post(
  "/api/superAdmin/activateBrand",
  passport.authenticate("jwt", { session: false }),
  superAdminController.activateBrand
);
superAdminRoute.post(
  "/api/superAdmin/deleteBrand",
  passport.authenticate("jwt", { session: false }),
  superAdminController.deleteBrand
);

module.exports = superAdminRoute;
