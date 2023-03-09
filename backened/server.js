var express = require("express");
var app = express();
var passport = require("passport");
var cors = require("cors");
var morgan = require("morgan");
var dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

require("./db/db");

var port = process.env.PORT || 5000;

app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require("./route/employee.route"));
app.use(require("./route/superAdmin.route"));
app.use(require("./route/brandAdmin.route"));
app.use(require("./route/outletAdmin.route"));
app.use(require("./route/product.route"));
app.use(require("./route/outletAgent.route"));
app.use(require("./route/order.route"));
app.use(require("./route/superAdminDashboard.route"));
app.use(require("./route/brandAdminDashboard.route"));
app.use(require("./route/outletAdminDashboard.route"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server started at port number : " + port);
  }
});
