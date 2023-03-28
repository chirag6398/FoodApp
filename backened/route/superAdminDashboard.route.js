var superAdminDashboardRoute = require("express").Router();
var superAdminDashboardController = require("../controller/superAdminDashboard");
var passport = require("passport");
var middleware = require("../auth/middleware").isSuperAdmin;

var passportJwt = require("../passport/passportjwt");

passportJwt.initializer(passport);

superAdminDashboardRoute.get(
  "/api/superAdmin/getBasicData",
  passport.authenticate("jwt", { session: false }),
  middleware,
  superAdminDashboardController.getBasicData
);

superAdminDashboardRoute.get(
  "/api/superAdmin/getBrandOutletData",
  passport.authenticate("jwt", { session: false }),
  middleware,
  superAdminDashboardController.getBrandData
);

superAdminDashboardRoute.get(
  "/api/superAdmin/getDataOfTopTwoBrands/:month",
  passport.authenticate("jwt", { session: false }),
  middleware,
  superAdminDashboardController.getDataOfTopTwoBrands
);

superAdminDashboardRoute.get(
  "/api/superAdmin/getBrandGraphData/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  superAdminDashboardController.getBrandGraphData
);

superAdminDashboardRoute.get(
  "/api/superAdmin/searchDashBoardBrandBySearchText/:searchText",
  passport.authenticate("jwt", { session: false }),
  middleware,
  superAdminDashboardController.searchDashBoardBrandBySearchText
);

superAdminDashboardRoute.get(
  "/api/superAdmin/getOutletGraphData/:id",
  passport.authenticate("jwt", { session: false }),
  middleware,
  superAdminDashboardController.getOutletGraphData
);
module.exports = superAdminDashboardRoute;
