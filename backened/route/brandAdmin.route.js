var brandAdminRoute = require("express").Router();
var brandAdminController = require("../controller/brandAdmin.js");
var passport = require("passport");
var multer = require("multer");
var passportJwt = require("../passport/passportjwt");
var validateOutlet = require("../service/validation.service").validateOutlet;
var validateUser = require("../service/validation.service").validateUserData;
var validateSuperCategory =
  require("../service/validation.service").validateSuperCategory;
var validateCategory =
  require("../service/validation.service").validateCategory;

var middleware = require("../auth/middleware").isBrandAdmin;

passportJwt.initializer(passport);
const uploadProductImg = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return new Error("file not supported");
    }
    cb(undefined, true);
  },
});

brandAdminRoute.get(
  "/api/brandAdmin/getBrandAdminPage",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.getBrandAdminPage
);
brandAdminRoute.get(
  "/api/brandAdmin/getOutlets/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.getOutlets
);
brandAdminRoute.post(
  "/api/brandAdmin/getCategory",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.getCategory
);
brandAdminRoute.get(
  "/api/brandAdmin/getSuperCategory/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.getSuperCategory
);
brandAdminRoute.get(
  "/api/brandAdmin/getBrandUsers",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.getBrandUsers
);

brandAdminRoute.get(
  "/api/brandAdmin/getOutlet/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.getOutlet
);

brandAdminRoute.get(
  "/api/brandAdmin/getAdmin/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.getAdmin
);

brandAdminRoute.post(
  "/api/brandAdmin/createOutlet",
  passport.authenticate("jwt", { session: false }),
  middleware,
  validateOutlet,
  brandAdminController.createOutlet
);
brandAdminRoute.post(
  "/api/brandAdmin/createOutletAdmin",
  passport.authenticate("jwt", { session: false }),
  middleware,
  validateUser,
  brandAdminController.createOutletAdmin
);
brandAdminRoute.post(
  "/api/brandAdmin/addCategory",
  uploadProductImg.single("file"),
  validateCategory,
  brandAdminController.addCategory
);
brandAdminRoute.post(
  "/api/brandAdmin/updateSuperCategory",
  uploadProductImg.single("file"),
  brandAdminController.updateSuperCategory
);
brandAdminRoute.post(
  "/api/brandAdmin/updateCategory",
  uploadProductImg.single("file"),
  brandAdminController.updateCategory
);
brandAdminRoute.post(
  "/api/brandAdmin/addSuperCategory",
  uploadProductImg.single("file"),
  validateSuperCategory,
  brandAdminController.addSuperCategory
);

brandAdminRoute.post(
  "/api/brandAdmin/updateLocation",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.updateLocation
);

brandAdminRoute.post(
  "/api/brandAdmin/updateContactInfo",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.updateContactInfo
);

brandAdminRoute.post(
  "/api/brandAdmin/updateOutletName",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminController.updateOutletName
);

module.exports = brandAdminRoute;
