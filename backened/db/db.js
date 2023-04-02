var mongoose = require("mongoose");
var createAdminService = require("../service/createadmin.service");
// var orderModel = require("../model/order.model");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("database connected");
    createAdminService.createAdmin();
  })
  .catch(function (err) {
    console.log("database not connected", err);
  });
