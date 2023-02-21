var outletAgentRoute=require("express").Router();
var outletAgentController=require("../controller/outletAgent.js");
var passport=require("passport");
var passportJwt=require("../passport/passportjwt");

passportJwt.initializer(passport);



outletAgentRoute.get("/api/outletAgent/getOutletAgentPage",passport.authenticate('jwt',{session: false }),outletAgentController.getOutletAgentPage);
// outletAgentRoute.get("/api/outlet/getProduct/:id",passport.authenticate('jwt',{session: false }),outletAgentController.getProduct);
// outletAgentRoute.get("/api/outletAgent/getCategory/:id",passport.authenticate('jwt',{session: false }),outletAgentController.getCategory);

// outletAgentRoute.post("/api/outlet/brandProducts",passport.authenticate('jwt',{session: false }),outletAgentController.brandProducts);
// outletAgentRoute.post("/api/outlet/categoryProduct",passport.authenticate('jwt',{session: false }),outletAgentController.categoryProduct);
// outletAgentRoute.post("/api/outlet/addProductToOutlet",passport.authenticate('jwt',{session: false }),outletAgentController.addProductToOutlet);
// outletAgentRoute.post("/api/outlet/removeOutletProduct",passport.authenticate('jwt',{session: false }),outletAgentController.removeOutletProduct);
// outletAgentRoute.post("/api/outletAgent/createOutletAgent",passport.authenticate('jwt',{session: false }),outletAgentController.createOutletAgent);

module.exports=outletAgentRoute;