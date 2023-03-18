var brandModel = require("../model/brand.model");
var employeeModel = require("../model/employee.model");
// var validation = require("../service/validation.service");
var async = require("async");
var outletModel = require("../model/outlet.model");
var categoryModel = require("../model/category.model");
var awsService = require("../service/awsS3.service");
var superCategory = require("../model/superCategory.model");
var mongoose = require("mongoose");
var productModel = require("../model/product.model");

module.exports = {
  getBrands: function (req, res) {
    if (req.user.userType === "superAdmin") {
      var limitSize = req.params.limit || 5;
      var pageNo = req.params.page || 1;
      var skipValue = (pageNo - 1) * limitSize;

      brandModel
        .find({ isDeleted: false })
        .skip(skipValue)
        .limit(limitSize)
        .sort({ name: "asc" })
        .then(function (result) {
          brandModel.countDocuments({}, function (err, count) {
            if (count) {
              console.log(result, count);
              return res.status(200).send({ data: result, count: count });
            } else {
              return res.status(500).send({
                message: "internal server error",
                error: err,
                status: 500,
              });
            }
          });
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
            logo: image,
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

  deactivateBrand: function (req, res) {
    console.log(req.body);
    req.body.brandId = mongoose.Types.ObjectId(req.body.brandId);
    brandModel
      .findByIdAndUpdate({ _id: req.body.brandId }, { isActive: false })
      .then(function (result) {
        return res.send({ message: "deactivated" });
      })
      .catch(function (err) {
        return res.status(500).send({ error: "server error" });
      });
  },

  activateBrand: function (req, res) {
    req.body.brandId = mongoose.Types.ObjectId(req.body.brandId);
    brandModel
      .findByIdAndUpdate({ _id: req.body.brandId }, { isActive: true })
      .then(function (result) {
        return res.send({ message: "deactivated" });
      })
      .catch(function (err) {
        return res.status(500).send({ error: "server error" });
      });
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

  getBrand: function (req, res) {
    brandModel
      .findById({ _id: req.params.id })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(401).send(err);
      });
  },
  changeLogo: function (req, res) {
    if (req.file) {
      return awsService
        .uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          console.log(data);
          var image = data.Location;

          mongoose.startSession().then(function (session) {
            session.startTransaction();

            // var data1 = brandModel.findByIdAndUpdate(
            //   { _id: req.body._id },
            //   {
            //     logo: image,
            //   },
            //   {
            //     session,
            //   }
            // );

            // var data2 = outletModel.updateMany(
            //   { "brand._id": req.body._id },
            //   {
            //     "brand.logo": image,
            //   }
            // );

            async.parallel(
              [
                function (callback) {
                  brandModel
                    .findByIdAndUpdate(
                      { _id: req.body._id },
                      {
                        logo: image,
                      },
                      {
                        session,
                      }
                    )
                    .then(function (result) {
                      callback(null, result);
                    })
                    .catch(function (err) {
                      callback(err);
                    });
                },
                function (callback) {
                  outletModel
                    .updateMany(
                      { "brand._id": req.body._id },
                      {
                        "brand.logo": image,
                      }
                    )
                    .then(function (result) {
                      callback(null, result);
                    })
                    .catch(function (err) {
                      callback(err);
                    });
                },
              ],
              function (err, result) {
                if (err) {
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
                } else {
                  session
                    .commitTransaction()
                    .then(function () {
                      session.endSession();
                      console.log(result);
                      return res.send(result);
                    })
                    .catch(function (err) {
                      console.log(err);
                    });
                }
              }
            );
            // Promise.all([data1, data2])
            //   .then(function (result) {
            //     console.log("parallel processing", result);
            //     session
            //       .commitTransaction()
            //       .then(function () {
            //         session.endSession();
            //         return res.status(result);
            //       })
            //       .catch(function (err) {
            //         console.log(err);
            //       });
            //   })
            //   .catch(function (error) {
            //     console.log("error in parallel processing", error);
            //     session
            //       .abortTransaction()
            //       .then(function () {
            //         console.log("transaction aborted");
            //         session.endSession();
            //       })
            //       .catch(function (err) {
            //         console.log(err);
            //         return res.status(500).send({ error: error });
            //       });
            //   });
          });
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send({ error: err, status: 500 });
        });
    } else {
      return res.status(401).send({ message: "plz try later" });
    }
  },
  updateBrandName: function (req, res) {
    mongoose.startSession().then(function (session) {
      session
        .withTransaction(function () {
          var up1 = brandModel.findByIdAndUpdate(
            { _id: req.body._id },
            { name: req.body.name },
            { session }
          );
          var bulkUpdateOpt = [
            {
              updateMany: {
                filter: {
                  "brand._id": req.body._id,
                },
                update: { $set: { "brand.name": req.body.name } },
              },
            },
          ];
          var up2 = categoryModel.bulkWrite(bulkUpdateOpt, { session });
          var up3 = employeeModel.bulkWrite(bulkUpdateOpt, { session });
          var up4 = outletModel.bulkWrite(bulkUpdateOpt, { session });
          var up5 = productModel.bulkWrite(bulkUpdateOpt, { session });
          var up6 = superCategory.bulkWrite(bulkUpdateOpt, { session });
          var up7 = employeeModel.bulkWrite(bulkUpdateOpt, { session });

          return Promise.all([up1, up2, up3, up4, up5, up6, up7]);
        })
        .then(function (result) {
          console.log("commited", result);
          session.endSession();
          return res.send(result);
        })
        .catch(function (err) {
          console.log("aborted", err);
          session.endSession();
          return res.status(500).send({ message: "not updated" });
        });
    });
  },

  searchBrandBySearchText: function (req, res) {
    var regex = new RegExp(req.params.searchText, "i");

    brandModel
      .find({ name: { $regex: regex } })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
};
