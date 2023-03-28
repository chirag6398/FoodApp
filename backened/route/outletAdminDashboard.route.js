var outletAdminDashboardRoute = require("express").Router();
var outletAdminDashboardController = require("../controller/outletAdminDashboard");
var passport = require("passport");
var middleware = require("../auth/middleware").isOutletAdmin;

var passportJwt = require("../passport/passportjwt");

passportJwt.initializer(passport);

outletAdminDashboardRoute.get(
  "/api/outletAdmin/getBasicData/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminDashboardController.getBasicData
);

outletAdminDashboardRoute.get(
  "/api/outletAdmin/getOutletSale",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminDashboardController.getOutletSale
);

outletAdminDashboardRoute.get(
  "/api/outletAdmin/getOrderActivity",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAdminDashboardController.getOrderActivity
);

module.exports = outletAdminDashboardRoute;
