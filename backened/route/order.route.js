var orderRoute = require("express").Router();
var orderController = require("../controller/order.js");
var passport = require("passport");
var passportJwt = require("../passport/passportjwt");

passportJwt.initializer(passport);

// orderRoute.get("/api/employee/getUserById/:id",orderController.getUserById);
orderRoute.post(
  "/api/order/createOrder",
  passport.authenticate("jwt", { session: false }),
  orderController.createOrder
);
orderRoute.get(
  "/api/order/getOrders/:id",
  passport.authenticate("jwt", { session: false }),
  orderController.getOrders
);
orderRoute.put(
  "/api/order/updateStatus",
  passport.authenticate("jwt", { session: false }),
  orderController.updateStatus
);
orderRoute.put(
  "/api/order/updateTableNo",
  passport.authenticate("jwt", { session: false }),
  orderController.updateTableNo
);
module.exports = orderRoute;
