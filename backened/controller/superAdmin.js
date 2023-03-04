var brandModel = require("../model/brand.model");
var employeeModel = require("../model/employee.model");
var validation = require("../service/validation.service");
var outletModel = require("../model/outlet.model");
var categoryModel = require("../model/category.model");
var awsService = require("../service/awsS3.service");
var superCategory = require("../model/superCategory.model");
var mongoose = require("mongoose");
module.exports = {
  getAdminPage: function (req, res) {
    // console.log(req.user);
    if (req.user.userType === "superAdmin") {
      return res.status(200).send({ message: "eligible", user: req.user });
    } else {
      return res.status(401).send({ message: "unauthorized user" });
    }
  },
  getBrands: function (req, res) {
    if (req.user.userType === "superAdmin") {
      brandModel
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
  createBrand: function (req, res) {
    console.log(req.body);
    console.log(req.file);
    if (req.file) {
      return awsService
        .uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          console.log(data);
          var image = data.Location;

          var brand = new brandModel({
            name: req.body.name,
            logo: "https://food-app-imgs.s3.ap-south-1.amazonaws.com/McDonalds.jpg",
            "contactInfo.email": req.body.email,
            "contactInfo.number": req.body.number,
            "location.city": req.body.city,
            "location.pinCode": req.body.pinCode,
            "location.address": req.body.address,
            description: req.body.description,
          });

          brand
            .save()
            .then(function (result) {
              return res.send({ message: "created with image", data: result });
            })
            .catch(function (err) {
              console.log(err);
              return res.status(401).send({ error: err });
            });
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send({ error: err, status: 500 });
        });
    } else {
      return res.status(500).send({ message: "not created try later" });
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

  deactivateBrand: function (req, res) {
    try {
      req.body.brandId = mongoose.Types.ObjectId(req.body.brandId);
      brandModel
        .findByIdAndUpdate({ _id: req.body.brandId }, { isActive: false })
        .then(function (result) {
          // console.log("result",result)
          return res.status({ message: "deactivated" });
        })
        .catch(function (err) {
          // console.log(err);
          return res.status(500).send({ error: "server error" });
        });
    } catch (err) {
      // console.log(err);
      return res.status(500).send({ error: "server error" });
    }
  },

  activateBrand: function (req, res) {
    try {
      req.body.brandId = mongoose.Types.ObjectId(req.body.brandId);
      brandModel
        .findByIdAndUpdate({ _id: req.body.brandId }, { isActive: true })
        .then(function (result) {
          // console.log("result",result)
          return res.status({ message: "deactivated" });
        })
        .catch(function (err) {
          // console.log(err);
          return res.status(500).send({ error: "server error" });
        });
    } catch (err) {
      // console.log(err);
      return res.status(500).send({ error: "server error" });
    }
  },

  deleteBrand: function (req, res) {
    console.log(req.body);

    brandModel
      .findByIdAndUpdate({ _id: req.body.brandId }, { isDeleted: true })
      .then(function (result) {
        return res.send({ message: "deleted" });
      })
      .catch(function (err) {
        return res.status(500).send({ error: err });
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
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(500).send({ error: err });
      });
  },

  updateBrand: function (req, res) {
    console.log(req.body);
    if (req.file) {
      return awsService
        .updateToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          console.log(data);
          var image = data.Location;

          brandModel
            .findByIdAndUpdate(
              { _id: req.body._id },
              {
                name: req.body.name,
                logo: image,
                "contactInfo.email": req.body.email,
                "contactInfo.number": req.body.number,
                "location.city": req.body.city,
                "location.pinCode": req.body.pinCode,
                "location.address": req.body.address,
                description: req.body.description,
              }
            )
            .then(function (result) {
              return res.send({ message: "updated with image" });
            })
            .catch(function (err) {
              return res.status(401).send({ error: err });
            });
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send({ error: err, status: 500 });
        });
    } else {
      brandModel
        .findByIdAndUpdate(
          { _id: req.body._id },
          {
            name: req.body.name,
            "contactInfo.email": req.body.email,
            "contactInfo.number": req.body.number,
            "location.city": req.body.city,
            "location.pinCode": req.body.pinCode,
            "location.address": req.body.address,
            description: req.body.description,
          }
        )
        .then(function (result) {
          return res.send({ message: "updated" });
        })
        .catch(function (err) {
          return res.status(401).send({ error: err });
        });
    }
  },
};
