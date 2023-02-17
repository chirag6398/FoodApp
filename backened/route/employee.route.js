var employeeRoute=require("express").Router();
var employeeController=require("../controller/employee.js");
var passport=require("passport");
var passportLocal=require("../passport/passportLocal");
// var passportJwt=require("../passport/passportjwt");

passportLocal.initializer(passport);
// passportJwt.initializer(passport);



employeeRoute.post("/api/employee/login",passport.authenticate('local',{session: false }),employeeController.logInHandler);


module.exports=employeeRoute;