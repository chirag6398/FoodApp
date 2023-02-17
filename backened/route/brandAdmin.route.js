var brandAdminRoute=require("express").Router();
var brandAdminController=require("../controller/brandAdmin.js");
var passport=require("passport");
var passportJwt=require("../passport/passportjwt");

passportJwt.initializer(passport);



brandAdminRoute.get("/api/brandAdmin/getBrandAdminPage",passport.authenticate('jwt',{session: false }),brandAdminController.getBrandAdminPage);
brandAdminRoute.get("/api/brandAdmin/getOutlets/:id",passport.authenticate('jwt',{session: false }),brandAdminController.getOutlets);
brandAdminRoute.get("/api/brandAdmin/getCategory/:id",passport.authenticate('jwt',{session: false }),brandAdminController.getCategory);

brandAdminRoute.post("/api/brandAdmin/createOutlet",passport.authenticate('jwt',{session: false }),brandAdminController.createOutlet);
brandAdminRoute.post("/api/brandAdmin/createOutletAdmin",passport.authenticate('jwt',{session: false }),brandAdminController.createBrandAdmin);
brandAdminRoute.post("/api/brandAdmin/addCategory",passport.authenticate('jwt',{session: false }),brandAdminController.addCategory);

module.exports=brandAdminRoute;