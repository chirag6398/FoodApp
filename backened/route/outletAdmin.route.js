var outletAdminRoute=require("express").Router();
var outletAdminController=require("../controller/outletAdmin.js");
var passport=require("passport");
var passportJwt=require("../passport/passportjwt");

passportJwt.initializer(passport);



outletAdminRoute.get("/api/outletAdmin/getAdminPage",passport.authenticate('jwt',{session: false }),outletAdminController.getAdminPage);
outletAdminRoute.get("/api/outlet/getProduct/:id",passport.authenticate('jwt',{session: false }),outletAdminController.getProduct);
// outletAdminRoute.get("/api/outletAdmin/getCategory/:id",passport.authenticate('jwt',{session: false }),outletAdminController.getCategory);

outletAdminRoute.post("/api/outlet/brandProducts",passport.authenticate('jwt',{session: false }),outletAdminController.brandProducts);
outletAdminRoute.post("/api/outlet/categoryProduct",passport.authenticate('jwt',{session: false }),outletAdminController.categoryProduct);
outletAdminRoute.post("/api/outlet/addProductToOutlet",passport.authenticate('jwt',{session: false }),outletAdminController.addProductToOutlet);
outletAdminRoute.post("/api/outlet/removeOutletProduct",passport.authenticate('jwt',{session: false }),outletAdminController.removeOutletProduct);
module.exports=outletAdminRoute;