var employeeRoute = require("express").Router();
var employeeController = require("../controller/employee.js");
var passport = require("passport");
var passportLocal = require("../passport/passportLocal");

passportLocal.initializer(passport);

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

employeeRoute.get(
  "/api/employee/searchUserBySearchTextAndBrandId",
  employeeController.searchUserBySearchTextAndBrandId
);

employeeRoute.put("/api/employee/updateUser", employeeController.updateUser);

employeeRoute.put(
  "/api/employee/updatePassword",
  employeeController.updatePassword
);

employeeRoute.put(
  "/api/employee/updateUserName",
  employeeController.updateUserName
);

employeeRoute.put("/api/employee/updateEmail", employeeController.updateEmail);

employeeRoute.put(
  "/api/employee/updatePhoneNumber",
  employeeController.updatePhoneNumber
);

employeeRoute.post(
  "/api/employee/login",
  passport.authenticate("local", { session: false }),
  employeeController.logInHandler
);

module.exports = employeeRoute;
