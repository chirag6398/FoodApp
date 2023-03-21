var employeeModel = require("../model/employee.model");
var bcrypt = require("bcrypt");

module.exports = {
  createAdmin: function () {
    employeeModel
      .findOne({ userType: "superAdmin" })
      .then(function (result) {
        if (!result) {
          var admin = new employeeModel({
            firstName: "Admin",
            LastName: "",
            password: "Admin1",
            userName: "admin1",
            number: "7896541263",
            email: "admin1@gmail.com",
            userType: "superAdmin",
            "location.city": "Delhi",
            "location.address": "Delhi Kirti Nagar",
            "location.pinCode": "200015",
          });
          admin
            .save()
            .then(function (result) {})
            .catch(function (err) {
              console.log(err);
            });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
