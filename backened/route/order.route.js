var orderRoute=require("express").Router();
var orderController=require("../controller/order.js");
var passport=require("passport");
var passportJwt=require("../passport/passportjwt");


passportJwt.initializer(passport);


// orderRoute.get("/api/employee/getUserById/:id",orderController.getUserById);
orderRoute.post("/api/order/createOrder",passport.authenticate('jwt',{session: false }),orderController.createOrder);


module.exports=orderRoute;