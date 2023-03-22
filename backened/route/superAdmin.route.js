var superAdminRoute = require("express").Router();
var superAdminController = require("../controller/superAdmin.js");
var passport = require("passport");
var multer = require("multer");
var validateUser = require("../service/validation.service").validateUserData;
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

superAdminRoute.get(
  "/api/superAdmin/getAdminPage",
  passport.authenticate("jwt", { session: false }),
  superAdminController.getAdminPage
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
  "/api/superAdmin/addBrandAdmin",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  superAdminController.addBrandAdmin
);

superAdminRoute.post(
  "/api/superAdmin/updateLocation",
  passport.authenticate("jwt", { session: false }),
  superAdminController.updateLocation
);

superAdminRoute.post(
  "/api/superAdmin/updateContactInfo",
  passport.authenticate("jwt", { session: false }),
  superAdminController.updateContactInfo
);

module.exports = superAdminRoute;
