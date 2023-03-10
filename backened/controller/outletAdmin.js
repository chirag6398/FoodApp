var outletModel = require("../model/outlet.model");
var brandModel = require("../model/brand.model");
var productModel = require("../model/product.model");
var categoryModel = require("../model/category.model");
var mongoose = require("mongoose");
var validation = require("../service/validation.service");
var employeeModel = require("../model/employee.model");

module.exports = {
  getAdminPage: function (req, res) {
    if (req.user.userType === "outletAdmin") {
      console.log(req.user);
      outletModel
        .findById({ _id: req.user.outlet._id })
        .then(function (result) {
          return brandModel
            .findById({ _id: result.brand._id }, { brandLogo: 1 })
            .then(function (brand) {
              console.log("brand outletadmin id", brand);
              return res.status(200).send({
                outletData: result,
                outletAdminData: req.user,
                brandLogo: brand.logo,
                brandId: brand._id,
              });
            })
            .catch(function (err) {
              console.log(err);
              return res
                .status(500)
                .send({ status: 500, message: "try later" });
            });
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send({ status: 500, message: "try later" });
        });
    }
  },
  categoryProduct: function (req, res) {
    console.log(req.body);

    return productModel
      .find({
        "brand._id": req.body.brandId,
        "category._id": req.body.categoryId,
        "outlet._id": { $ne: req.body.outletId },
      })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      });
  },
  brandProducts: function (req, res) {
    console.log(req.body);

    return categoryModel
      .find({ "brand._id": req.body.brandId })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      });
  },
  addProductToOutlet: function (req, res) {
    // console.log(req.body);
    // console.log(req.body)
    mongoose.startSession().then(function (session) {
      session.startTransaction();

      Promise.all([
        outletModel.findByIdAndUpdate(
          { _id: req.body.outletId },
          {
            $push: {
              products: {
                product: {
                  name: req.body.name,
                  price: req.body.price,
                  description: req.body.description,
                  "category._id": req.body.category._id,
                  "category.name": req.body.category.name,
                  "superCategory._id": req.body.superCategory._id,
                  "superCategory.name": req.body.superCategory.name,
                  _id: req.body._id,
                  img: req.body.img,
                },
              },
            },
          },
          { session }
        ),
        productModel.findByIdAndUpdate(
          { _id: req.body._id },
          {
            $push: {
              outlet: {
                _id: req.body.outletId,
              },
            },
          }
        ),
      ])
        .then(function (result) {
          console.log("parallel processing", result);
          session
            .commitTransaction()
            .then(function () {
              session.endSession();
              return res.status(result);
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(function (error) {
          console.log("error in parallel processing", error);
          session
            .abortTransaction()
            .then(function () {
              console.log("transaction aborted");
              session.endSession();
            })
            .catch(function (err) {
              console.log(err);
              return res.status(500).send({ error: error });
            });
        });
    });
  },
  getProduct: function (req, res) {
    var outletId = mongoose.Types.ObjectId(req.params.id);
    console.log("outletid", req.params.id);
    outletModel
      .aggregate([
        {
          $match: {
            _id: outletId,
          },
        },
        {
          $unwind: "$products",
        },
        {
          $group: {
            _id: "$products.product.category._id",
            name: { $first: "$products.product.category.name" },
            brandLogo: { $first: "$brand.logo" },
            products: { $push: "$products.product" },
          },
        },
        {
          $sort: { name: 1 },
        },
      ])
      .exec(function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).send({ error: err });
        } else {
          console.log("result", result);
          return res.status(200).send(result);
        }
      });
  },

  removeOutletProduct: function (req, res) {
    console.log(req.body);

    outletModel
      .updateOne(
        { _id: req.body.outletId },
        {
          $pull: {
            products: {
              "product.name": req.body.name,
            },
          },
        }
      )
      .then(function (result) {
        productModel
          .updateOne(
            { name: req.body.name },
            {
              $pull: {
                outletIds: {
                  outletId: req.body.outletId,
                },
              },
            }
          )
          .then(function (result) {
            console.log(result);
          })
          .catch(function (err) {
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  createOutletAgent: function (req, res) {
    console.log(req.body);
    var valid = validation.validateUserData(req, res);
    console.log(valid);
    if (valid) {
      var outletAgent = new employeeModel({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        outlet: req.body.outlet,
        userType: "outletAgent",
        brand: req.body.brand,
        "location.address": req.body.address,
        "location.pinCode": req.body.pinCode,
        "location.city": req.body.city,
      });

      outletAgent
        .save()
        .then(function (result) {
          console.log(result);
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
    } else {
      return res.status(500).send({ error: "try later", status: 500 });
    }
  },
  updateOutletData: function (req, res) {
    console.log(req.body);

    outletModel
      .findOneAndUpdate(
        { _id: req.body._id },
        {
          name: req.body.name,
          type: req.body.type,
          description: req.body.description,
          "contactInfo.number": req.body.number,
          "contactInfo.email": req.body.email,
        }
      )
      .then(function (result) {
        console.log(result);
        return res.send({ message: "updated" });
      })
      .catch(function (err) {
        return res.status(500).send({ error: err });
      });
  },
  togleOutlet: function (req, res) {
    console.log(req.body);

    outletModel
      .findOne(
        { _id: mongoose.Types.ObjectId(req.body.outletId) },
        { isActive: 1 }
      )
      .then(function (user) {
        // console.log("user",user);
        user.isActive = !user.isActive;

        user
          .save()
          .then(function (result) {
            // console.log(result);
            return res.send(result);
          })
          .catch(function (err) {
            return res.status(500).send(err);
          });
      });
  },
  addTax: function (req, res) {
    console.log(req.body);
    outletModel
      .findOneAndUpdate(
        { _id: req.body._id },
        { $push: { taxes: req.body.tax } },
        { new: true, projection: { taxes: 1 } }
      )
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(404).send(err);
      });
  },
  getTaxes: function (req, res) {
    outletModel
      .findById({ _id: req.params.id }, { taxes: 1 })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(404).send(err);
      });
  },
};
