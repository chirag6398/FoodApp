var brandAdminDashboardRoute = require("express").Router();
var brandAdminDashboardController = require("../controller/brandAdminDashboard");
var passport = require("passport");
var middleware = require("../auth/middleware").isBrandAdmin;

var passportJwt = require("../passport/passportjwt");

passportJwt.initializer(passport);

brandAdminDashboardRoute.get(
  "/api/brandAdmin/getBasicData/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminDashboardController.getBasicData
);

brandAdminDashboardRoute.get(
  "/api/brandAdmin/getOutletGraphData/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminDashboardController.getOutletGraphData
);

brandAdminDashboardRoute.get(
  "/api/brandAdmin/getGraphData",
  passport.authenticate("jwt", { session: false }),
  middleware,
  brandAdminDashboardController.getGraphData
);

module.exports = brandAdminDashboardRoute;
