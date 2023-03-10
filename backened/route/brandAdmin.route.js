var brandAdminRoute = require("express").Router();
var brandAdminController = require("../controller/brandAdmin.js");
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

brandAdminRoute.get(
  "/api/brandAdmin/getBrandAdminPage",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.getBrandAdminPage
);
brandAdminRoute.get(
  "/api/brandAdmin/getOutlets/:id",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.getOutlets
);
brandAdminRoute.post(
  "/api/brandAdmin/getCategory",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.getCategory
);
brandAdminRoute.get(
  "/api/brandAdmin/getSuperCategory/:id",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.getSuperCategory
);
brandAdminRoute.get(
  "/api/brandAdmin/getBrandUsers/:id",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.getBrandUsers
);

brandAdminRoute.get(
  "/api/brandAdmin/getOutlet/:id",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.getOutlet
);

brandAdminRoute.get(
  "/api/brandAdmin/getAdmin/:id",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.getAdmin
);

brandAdminRoute.post(
  "/api/brandAdmin/createOutlet",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.createOutlet
);
brandAdminRoute.post(
  "/api/brandAdmin/createOutletAdmin",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.createOutletAdmin
);
brandAdminRoute.post(
  "/api/brandAdmin/addCategory",
  uploadProductImg.single("file"),
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
  brandAdminController.addSuperCategory
);

brandAdminRoute.post(
  "/api/brandAdmin/updateLocation",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.updateLocation
);

brandAdminRoute.post(
  "/api/brandAdmin/updateContactInfo",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.updateContactInfo
);

brandAdminRoute.post(
  "/api/brandAdmin/updateOutletName",
  passport.authenticate("jwt", { session: false }),
  brandAdminController.updateOutletName
);

module.exports = brandAdminRoute;
