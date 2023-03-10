var outletAdminDashboardRoute = require("express").Router();
var outletAdminDashboardController = require("../controller/outletAdminDashboard");
var passport = require("passport");

var passportJwt = require("../passport/passportjwt");

passportJwt.initializer(passport);

outletAdminDashboardRoute.get(
  "/api/outletAdmin/getBasicData/:id",
  passport.authenticate("jwt", { session: false }),
  outletAdminDashboardController.getBasicData
);

module.exports = outletAdminDashboardRoute;
