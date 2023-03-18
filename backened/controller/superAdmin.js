var brandModel = require("../model/brand.model");
var employeeModel = require("../model/employee.model");
var validation = require("../service/validation.service");
var outletModel = require("../model/outlet.model");
var categoryModel = require("../model/category.model");
var awsService = require("../service/awsS3.service");
var superCategory = require("../model/superCategory.model");
var mongoose = require("mongoose");
var productModel = require("../model/product.model");

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
    var valid = validation.validateUserData(req, res);
    console.log(valid, req.body);

    if (valid && req.body.brandId) {
      var brandAdmin = new employeeModel({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        "brand._id": req.body.brandId,
        "brand.name": req.body.brandName,
        userType: "brandAdmin",
        "location.address": req.body.address,
        "location.city": req.body.city,
        "location.pinCode": req.body.pinCode,
      });

      return brandAdmin
        .save()
        .then(function (result) {
          // console.log(result);

          brandModel
            .findByIdAndUpdate(
              { _id: req.body.brandId },
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
    } else {
      return res.status(404).send({ error: "data not found", status: 404 });
    }
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
