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
  "/api/superAdmin/getDataOfTopTwoBrands/:month",
  passport.authenticate("jwt", { session: false }),
  superAdminDashboardController.getDataOfTopTwoBrands
);

superAdminDashboardRoute.get(
  "/api/superAdmin/getBrandGraphData/:id",
  passport.authenticate("jwt", { session: false }),
  superAdminDashboardController.getBrandGraphData
);

superAdminDashboardRoute.get(
  "/api/superAdmin/getOutletGraphData/:id",
  passport.authenticate("jwt", { session: false }),
  superAdminDashboardController.getOutletGraphData
);
module.exports = superAdminDashboardRoute;
