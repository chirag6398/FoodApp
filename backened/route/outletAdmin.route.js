var outletAdminRoute=require("express").Router();
var outletAdminController=require("../controller/outletAdmin.js");
var passport=require("passport");
var passportJwt=require("../passport/passportjwt");

passportJwt.initializer(passport);



outletAdminRoute.get("/api/outletAdmin/getOutletPageByOutletId",passport.authenticate('jwt',{session: false }),outletAdminController.getOutletPageByOutletId);
// outletAdminRoute.get("/api/outletAdmin/getOutlets/:id",passport.authenticate('jwt',{session: false }),outletAdminController.getOutlets);
// outletAdminRoute.get("/api/outletAdmin/getCategory/:id",passport.authenticate('jwt',{session: false }),outletAdminController.getCategory);

// outletAdminRoute.post("/api/outletAdmin/createOutlet",passport.authenticate('jwt',{session: false }),outletAdminController.createOutlet);
// outletAdminRoute.post("/api/outletAdmin/createOutletAdmin",passport.authenticate('jwt',{session: false }),outletAdminController.createoutletAdmin);
// outletAdminRoute.post("/api/outletAdmin/addCategory",passport.authenticate('jwt',{session: false }),outletAdminController.addCategory);

module.exports=outletAdminRoute;