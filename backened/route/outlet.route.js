var outletRoute = require("express").Router();
var outletController = require("../controller/outlet.js");
var passport = require("passport");
var passportJwt = require("../passport/passportjwt");

passportJwt.initializer(passport);

outletRoute.post(
  "/api/outlet/saveTableView",
  passport.authenticate("jwt", { session: false }),
  outletController.saveTableView
);

outletRoute.put(
  "/api/outlet/deleteOutlet",
  passport.authenticate("jwt", { session: false }),
  outletController.deleteOutlet
);

outletRoute.get(
  "/api/outlet/searchOutletBySearchText/:searchText",
  passport.authenticate("jwt", { session: false }),
  outletController.searchOutletBySearchText
);

module.exports = outletRoute;
