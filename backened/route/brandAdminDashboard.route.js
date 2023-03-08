var brandAdminDashboardRoute = require("express").Router();
var brandAdminDashboardController = require("../controller/brandAdminDashboard");
var passport = require("passport");

// // var passportLocal=require("../passport/passportLocal");
var passportJwt = require("../passport/passportjwt");

// // passportLocal.initializer(passport);
passportJwt.initializer(passport);

brandAdminDashboardRoute.get(
  "/api/brandAdmin/getBasicData/:id",
  passport.authenticate("jwt", { session: false }),
  brandAdminDashboardController.getBasicData
);

brandAdminDashboardRoute.get(
  "/api/brandAdmin/getOutletGraphData/:id",
  passport.authenticate("jwt", { session: false }),
  brandAdminDashboardController.getOutletGraphData
);

module.exports = brandAdminDashboardRoute;
