var outletAdminRoute = require("express").Router();
var outletAdminController = require("../controller/outletAdmin.js");
var passport = require("passport");
var passportJwt = require("../passport/passportjwt");
var middleware = require("../auth/middleware").isOutletAdmin;

var validateUser = require("../service/validation.service").validateUserData;

passportJwt.initializer(passport);

outletAdminRoute.get(
  "/api/outletAdmin/getAdminPage",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.getAdminPage
);

outletAdminRoute.get(
  "/api/outlet/getProduct/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.getProduct
);

outletAdminRoute.get(
  "/api/outlet/getTaxes/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.getTaxes
);

outletAdminRoute.get(
  "/api/outletAdmin/getSuperCategories/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.getSuperCategories
);

outletAdminRoute.get(
  "/api/outletAdmin/getSubCategories/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.getSubCategories
);

outletAdminRoute.put(
  "/api/outletAdmin/removeTax",
  outletAdminController.removeTax
);
outletAdminRoute.put(
  "/api/outletAdmin/updateTax",
  outletAdminController.updateTax
);

// outletAdminRoute.get("/api/outletAdmin/getCategory/:id",passport.authenticate('jwt',{session: false }),outletAdminController.getCategory);

// outletAdminRoute.post(
//   "/api/outlet/brandProducts",
//   passport.authenticate("jwt", { session: false }),
// middleware,
//   outletAdminController.brandProducts
// );
outletAdminRoute.post(
  "/api/outlet/categoryProduct",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.categoryProduct
);
outletAdminRoute.post(
  "/api/outlet/addProductToOutlet",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.addProductToOutlet
);
outletAdminRoute.post(
  "/api/outlet/removeOutletProduct",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.removeOutletProduct
);
outletAdminRoute.post(
  "/api/outletAdmin/createOutletAgent",
  passport.authenticate("jwt", { session: false }),
  middleware,
  validateUser,
  outletAdminController.createOutletAgent
);
outletAdminRoute.put(
  "/api/outlet/updateOutletData",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.updateOutletData
);
outletAdminRoute.put(
  "/api/outlet/togleOutlet",
  passport.authenticate("jwt", { session: false }),
  outletAdminController.togleOutlet
);
outletAdminRoute.post(
  "/api/outlet/addTax",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminController.addTax
);
module.exports = outletAdminRoute;
