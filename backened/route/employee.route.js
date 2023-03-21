var employeeRoute = require("express").Router();
var employeeController = require("../controller/employee.js");
var passport = require("passport");
var passportLocal = require("../passport/passportLocal");
// var passportJwt=require("../passport/passportjwt");

passportLocal.initializer(passport);
// passportJwt.initializer(passport);

employeeRoute.get(
  "/api/employee/getUserById/:id",
  employeeController.getUserById
);
employeeRoute.get("/api/employee/getUsers", employeeController.getUsers);
employeeRoute.get(
  "/api/employee/getOutletAgentEmployees/:id",
  employeeController.getOutletAgentEmployees
);

employeeRoute.get(
  "/api/employee/searchUserBySearchText/:searchText",
  employeeController.searchUserBySearchText
);

// employeeRoute.get(
//   "/api/employee/applyFilterOnUsers",
//   employeeController.applyFilterOnUsers
// );

employeeRoute.put("/api/employee/updateUser", employeeController.updateUser);
employeeRoute.put(
  "/api/employee/updatePassword",
  employeeController.updatePassword
);

employeeRoute.post(
  "/api/employee/login",
  passport.authenticate("local", { session: false }),
  employeeController.logInHandler
);

module.exports = employeeRoute;
