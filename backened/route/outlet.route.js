var outletRoute = require("express").Router();
var outletController = require("../controller/outlet.js");
var passport = require("passport");
var passportJwt = require("../passport/passportjwt");

passportJwt.initializer(passport);

// outletRoute.get(
//   "/api/outlet/getOutlet/:id",
//   passport.authenticate("jwt", { session: false }),
//   outletController.getOutlet
// );

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

module.exports = outletRoute;
