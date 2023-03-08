var superAdminDashboardRoute = require("express").Router();
var superAdminDashboardController = require("../controller/superAdminDashboard");
var passport = require("passport");

// // var passportLocal=require("../passport/passportLocal");
var passportJwt = require("../passport/passportjwt");

// // passportLocal.initializer(passport);
passportJwt.initializer(passport);

superAdminDashboardRoute.get(
  "/api/superAdmin/getBasicData",
  passport.authenticate("jwt", { session: false }),
  superAdminDashboardController.getBasicData
);

superAdminDashboardRoute.get(
  "/api/superAdmin/getBrandOutletData",
  passport.authenticate("jwt", { session: false }),
  superAdminDashboardController.getBrandData
);
superAdminDashboardRoute.get(
  "/api/superAdmin/getBrandGraphData/:id",
  passport.authenticate("jwt", { session: false }),
  superAdminDashboardController.getBrandGraphData
);
module.exports = superAdminDashboardRoute;
