var superAdminDashboardRoute = require("express").Router();
var superAdminDashboardController = require("../controller/supeAdminDashboard.js");
var passport = require("passport");

// // var passportLocal=require("../passport/passportLocal");
var passportJwt = require("../passport/passportjwt");

// // passportLocal.initializer(passport);
passportJwt.initializer(passport);

module.exports = superAdminDashboardRoute;
