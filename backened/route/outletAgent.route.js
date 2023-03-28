var outletAgentRoute = require("express").Router();
var outletAgentController = require("../controller/outletAgent.js");
var passport = require("passport");
var passportJwt = require("../passport/passportjwt");
var middleware = require("../auth/middleware").isOutletAgent;

passportJwt.initializer(passport);

outletAgentRoute.get(
  "/api/outletAgent/getOutletAgentPage",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAgentController.getOutletAgentPage
);
outletAgentRoute.get(
  "/api/outletAgent/getProductByName/:_id/:searchText",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAgentController.getProductByName
);

outletAgentRoute.get(
  "/api/outletAgent/getRecommendedProduct",
  passport.authenticate("jwt", { session: false }),
  middleware,
  outletAgentController.getRecommendedProduct
);

module.exports = outletAgentRoute;
