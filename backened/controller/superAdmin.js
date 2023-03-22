var brandModel = require("../model/brand.model");
var employeeModel = require("../model/employee.model");
var outletModel = require("../model/outlet.model");
var superCategory = require("../model/superCategory.model");
var mongoose = require("mongoose");

module.exports = {
  getAdminPage: function (req, res) {
    if (req.user.userType === "superAdmin") {
      return res.status(200).send({ message: "eligible", user: req.user });
    } else {
      return res.status(401).send({ message: "unauthorized user" });
    }
  },

  getBrandOutlets: function (req, res) {
    if (req.user.userType === "superAdmin") {
      outletModel
        .find({})
        .sort({ name: 1 })
        .then(function (result) {
          return res.status(200).send({ data: result, status: 200 });
        })
        .catch(function (err) {
          return res.status(500).send({
            message: "internal server error",
            error: err,
            status: 500,
          });
        });
    } else {
      return res.status(401).send({ message: "unauthorized user" });
    }
  },

  addBrandAdmin: function (req, res) {
    var body = req.body;

    var brandAdmin = new employeeModel({
      userName: body.userName,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      number: body.number,
      password: body.password,
      "brand._id": body.brandId,
      "brand.name": body.brandName,
      userType: "brandAdmin",
      "location.address": body.address,
      "location.city": body.city,
      "location.pinCode": body.pinCode,
    });

    return brandAdmin
      .save()
      .then(function (result) {
        // console.log(result);

        brandModel
          .findByIdAndUpdate(
            { _id: body.brandId },
            { brandAdminId: result._id }
          )
          .then(function (updated) {
            // console.log(updated);
            return res
              .status(200)
              .send({ message: "admin created successfully", status: 200 });
          })
          .catch(function (err) {
            console.log(err);
            return res
              .status(500)
              .send({ error: "internal server error", status: 500 });
          });
      })
      .catch(function (err) {
        console.log(err);
        return res
          .status(500)
          .send({ error: "internal server error", status: 500 });
      });
  },

  getSuperCategory: function (req, res) {
    superCategory
      .find({})
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(500).send({ message: "internal server error" });
      });
  },

  getOutlets: function (req, res) {
    outletModel
      .find({})
      .sort({ "brand.name": 1 })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(500).send({ error: err });
      });
  },

  updateLocation: function (req, res) {
    brandModel
      .findByIdAndUpdate(
        { _id: req.body._id },
        {
          location: req.body.location,
        }
      )
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
  updateContactInfo: function (req, res) {
    brandModel
      .findByIdAndUpdate(
        { _id: req.body._id },
        { contactInfo: req.body.contactInfo }
      )
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
};
