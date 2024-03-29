var brandModel = require("../model/brand.model");
var productModel = require("../model/product.model");
var outletModel = require("../model/outlet.model");
var employeeModel = require("../model/employee.model");
var superCategoryModel = require("../model/superCategory.model");
var categoryModel = require("../model/category.model");
var mongoose = require("mongoose");
var awsService = require("../service/awsS3.service");

module.exports = {
  getBrandAdminPage: function (req, res) {
    brandModel
      .findById({ _id: req.user.brand._id })
      .then(function (result) {
        return res.status(200).send({ data: result, status: 200 });
      })
      .catch(function (err) {
        return res
          .status(500)
          .send({ message: "internal server error", status: 500 });
      });
  },

  createOutlet: function (req, res) {
    var outlet = new outletModel({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      "location.address": req.body.address,
      "location.city": req.body.city,
      "location.pinCode": req.body.pinCode,
      "contactInfo.number": req.body.number,
      "contactInfo.email": req.body.email,
      "brand._id": req.body.brandId,
      "brand.name": req.body.brandName,
      "brand.logo": req.body.brandLogo,
    });

    outlet
      .save()
      .then(function (result) {
        console.log(result);
        return res.status(200).send(result);
      })
      .catch(function (err) {
        let errMsg;
        if (err.code == 11000) {
          errMsg = Object.keys(err.keyValue)[0] + " already exists.";
        } else {
          errMsg = "unknown error please try later";
        }
        res.status(400).send({ message: errMsg });
      });
  },

  getOutlets: function (req, res) {
    var query = req.query;
    var limit = query.limit || 5;
    var page = query.page || 1;
    var skip = (page - 1) * limit;
    var filter = { "brand._id": query.id, isDeleted: false, isActive: true };

    outletModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .then(function (result) {
        console.log(result);
        outletModel.countDocuments(filter, function (err, count) {
          if (!err) {
            return res.send({ data: result, count });
          } else {
            console.log("error", err);
            return res
              .status(500)
              .send({ message: "please try later", status: 500 });
          }
        });
        // return res.status(200).send({ data: result, status: 200 });
      })
      .catch(function (err) {
        console.log(err);
        return res
          .status(500)
          .send({ message: "please try later", status: 500 });
      });
  },

  createOutletAdmin: function (req, res) {
    console.log(req.body);
    if (
      req.body.outletId &&
      req.body.brandId &&
      req.body.outletName &&
      req.body.brandName
    ) {
      var outletAdmin = new employeeModel({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        userType: "outletAdmin",
        "outlet._id": req.body.outletId,
        "outlet.name": req.body.outletName,
        "brand._id": req.body.brandId,
        "brand.name": req.body.brandName,
        "outlet.type": req.body.outletType,
        "location.address": req.body.address,
        "location.city": req.body.city,
        "location.pinCode": req.body.pinCode,
      });

      return outletAdmin
        .save()
        .then(function (result) {
          console.log(result);

          outletModel
            .findByIdAndUpdate(
              { _id: req.body.outletId },
              { outletAdminId: result._id }
            )
            .then(function (updated) {
              // console.log(updated);
              return res.status(200).send({
                message: "admin created successfully",
                adminId: result._id,
                status: 200,
              });
            });
          // .catch(function (err) {
          //   return res
          //     .status(500)
          //     .send({ message: "internal server error", status: 500 });
          // });
        })
        .catch(function (err) {
          let errMsg;
          if (err.code == 11000) {
            errMsg = Object.keys(err.keyValue)[0] + " already exists.";
          } else {
            errMsg = "unknown error please try later";
          }
          res.status(400).send({ message: errMsg });
        });
    } else {
      return res.status(400).send({ message: "data not found", status: 400 });
    }
  },

  addCategory: function (req, res) {
    if (req.file) {
      return awsService
        .uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          console.log(data);
          var image = data.Location;

          var category = new categoryModel({
            name: req.body.name,
            "brand._id": req.body.brandId,
            "superCategory._id": req.body.superCategoryId,
            logo: image,
            "brand.name": req.body.brandName,
            "superCategory.name": req.body.superCategoryName,
          });

          categoryModel
            .findOne({ name: req.body.name, "brand._id": req.body.brandId })
            .then(function (result) {
              if (result) {
                return res
                  .status(400)
                  .send({ message: "category name exists" });
              } else {
                category
                  .save()
                  .then(function (result) {
                    console.log("added category", result);
                    return res.status(200).send(result);
                  })
                  .catch(function (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .send({ message: "internal server error", status: 500 });
                  });
              }
            })
            .catch(function (err) {
              console.log(err);
              return res
                .status(500)
                .send({ message: "internal server error", status: 500 });
            });
        })
        .catch(function (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "internal server error", status: 500 });
        });
    } else {
      return res.status(400).send({ message: "file not found" });
    }
  },

  getCategory: function (req, res) {
    console.log(req.body);
    // console.log(req.file);
    categoryModel
      .find({
        "brand._id": req.body.brandId,
        "superCategory._id": req.body.superCategoryId,
      })
      .then(function (result) {
        console.log(result);
        return res.status(200).send(result);
      })
      .catch(function (err) {
        return res
          .status(500)
          .send({ message: "internal server error", status: 500 });
      });
  },

  addSuperCategory: function (req, res) {
    if (req.file) {
      return awsService
        .uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          var image = data.Location;
          var superCategory = new superCategoryModel({
            name: req.body.name,
            logo: image,
            "brand.name": req.body.brandName,
            "brand._id": req.body.brandId,
          });
          superCategoryModel
            .findOne({ name: req.body.name, "brand._id": req.body.brandId })
            .then(function (result) {
              if (result) {
                return res
                  .status(400)
                  .send({ message: "supercategory name exists" });
              } else {
                superCategory
                  .save()
                  .then(function (result) {
                    return res.send(result);
                  })
                  .catch(function (err) {
                    console.log(err);
                    return res
                      .status(400)
                      .send({ message: "please enter valid and correct data" });
                  });
              }
            })
            .catch(function (err) {
              return res.status(500).send({ message: "please try later " });
            });
        })
        .catch(function (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "internal server error", status: 500 });
        });
    } else {
      return res.status(400).send({ message: "file not found" });
    }
  },

  getSuperCategory: function (req, res) {
    superCategoryModel
      .find({ "brand._id": mongoose.Types.ObjectId(req.params.id) })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ message: "internal server error" });
      });
    //send super category
  },

  getBrandUsers: function (req, res) {
    var query = req.query;
    var tmp = ["superAdmin", "brandAdmin"];
    var filter = {
      isActive: true,
      isDeleted: false,
      userType: { $nin: tmp },
      "brand._id": query.id,
    };

    var limit = query.limit;
    var pageNo = query.pageNo;
    var skip = (pageNo - 1) * limit;

    if (query.email) {
      filter["email"] = query.email;
    }
    if (query.userType) {
      filter["userType"] = query.userType;
    }
    if (query.number && query.number !== "null") {
      filter["number"] = +query.number;
    }

    employeeModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })
      .then(function (result) {
        employeeModel.countDocuments(filter, function (err, count) {
          console.log(result, filter);
          return res.send({ data: result, count: count });
        });
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ message: "internal server error" });
      });
  },

  updateSuperCategory: function (req, res) {
    console.log(req.body);
    if (req.file) {
      return awsService
        .updateToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          console.log(data);
          var image = data.Location;

          var data1 = superCategoryModel.findByIdAndUpdate(
            { _id: req.body._id },
            {
              name: req.body.name,
              logo: image,
            }
          );

          var data2 = categoryModel.updateMany(
            { "superCategory._id": req.body._id },
            { "superCategory.name": req.body.name }
          );
          var data3 = productModel.updateMany(
            { "superCategory._id": req.body._id },
            { "superCategory.name": req.body.name }
          );
          var data4 = outletModel.updateMany(
            { "brand._id": req.body.brandId },
            { "products.$[elem].product.superCategory.name": req.body.name },
            {
              arrayFilters: [
                { "elem.product.superCategory._id": req.body._id },
              ],
            }
          );

          Promise.all([data1, data2, data3, data4])
            .then(function (result) {
              return res.send(result);
            })
            .catch(function (err) {
              return res
                .status(400)
                .send({ message: "please enter valid and correct data" });
            });
        })
        .catch(function (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "internal server error", status: 500 });
        });
    } else {
      superCategoryModel
        .findOne({ name: req.body.name, "brand._id": req.body.brandId })
        .then(function (result) {
          if (result) {
            return res.status(400).send({ message: "name must be unique" });
          } else {
            console.log(result);
            var data1 = superCategoryModel.findByIdAndUpdate(
              { _id: req.body._id },
              {
                name: req.body.name,
              }
            );

            var data2 = categoryModel.updateMany(
              { "superCategory._id": req.body._id },
              { "superCategory.name": req.body.name }
            );
            var data3 = productModel.updateMany(
              { "superCategory._id": req.body._id },
              { "superCategory.name": req.body.name }
            );
            var data4 = outletModel.updateMany(
              { "brand._id": req.body.brandId },
              { "products.$[elem].product.superCategory.name": req.body.name },
              {
                arrayFilters: [
                  { "elem.product.superCategory._id": req.body._id },
                ],
              }
            );

            Promise.all([data1, data2, data3, data4])
              .then(function (result) {
                // console.log(result);
                return res.send(result);
              })
              .catch(function (err) {
                // console.log(err);
                return res
                  .status(400)
                  .send({ message: "please enter valid and correct data" });
              });
          }
        });
    }
  },

  updateCategory: function (req, res) {
    console.log(req.body);
    if (req.file) {
      return awsService
        .updateToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          console.log(data);
          var image = data.Location;

          var data1 = categoryModel.findByIdAndUpdate(
            { _id: req.body._id },
            {
              name: req.body.name,
              logo: image,
            }
          );

          var data2 = productModel.updateMany(
            { "superCategory.category._id": req.body._id },
            { "superCategory.category.name": req.body.name }
          );
          var data3 = outletModel.updateMany(
            { "brand._id": req.body.brandId },
            {
              "products.$[elem].product.superCategory.category.name":
                req.body.name,
            },
            {
              arrayFilters: [
                { "elem.product.superCategory.category._id": req.body._id },
              ],
            }
          );

          Promise.all([data1, data2, data3])
            .then(function (result) {
              return res.send(result);
            })
            .catch(function (err) {
              console.log(err);
              return res
                .status(400)
                .send({ message: "please enter valid and correct data" });
            });
        })
        .catch(function (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "internal server error", status: 500 });
        });
    } else {
      categoryModel
        .findOne({ "brand._id": req.body.brandId, name: req.body.name })
        .then(function (result) {
          if (result) {
            return res.status(400).send({ message: "name must be unique" });
          } else {
            var data1 = categoryModel.findByIdAndUpdate(
              { _id: req.body._id },
              {
                name: req.body.name,
              }
            );

            var data2 = productModel.updateMany(
              { "category._id": req.body._id },
              { "category.name": req.body.name }
            );
            var data3 = outletModel.updateMany(
              { "brand._id": req.body.brandId },
              {
                "products.$[elem].product.superCategory.category.name":
                  req.body.name,
              },
              {
                arrayFilters: [
                  { "elem.product.superCategory.category._id": req.body._id },
                ],
              }
            );

            Promise.all([data1, data2, data3])
              .then(function (result) {
                return res.send(result);
              })
              .catch(function (err) {
                console.log(err);
                return res
                  .status(400)
                  .send({ message: "please enter valid and correct data" });
              });
          }
        });
    }
  },
  getOutlet: function (req, res) {
    outletModel
      .findById({ _id: req.params.id })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ message: "internal server error" });
      });
  },
  updateOutletName: function (req, res) {
    mongoose.startSession().then(function (session) {
      session
        .withTransaction(function () {
          var up1 = outletModel.findByIdAndUpdate(
            { _id: req.body._id },
            { name: req.body.name },
            { session }
          );
          var bulkUpdateOpt = [
            {
              updateMany: {
                filter: {
                  "outlet._id": req.body._id,
                },
                update: { $set: { "outlet.name": req.body.name } },
              },
            },
          ];
          var up2 = employeeModel.bulkWrite(bulkUpdateOpt, { session });

          return Promise.all([up1, up2]);
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
  updateLocation: function (req, res) {
    outletModel
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
        return res.status(500).send({ message: "internal server error" });
      });
  },
  updateContactInfo: function (req, res) {
    outletModel
      .findByIdAndUpdate(
        { _id: req.body._id },
        { contactInfo: req.body.contactInfo }
      )
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ message: "internal server error" });
      });
  },
  getAdmin: function (req, res) {
    employeeModel
      .findById(
        { _id: req.params.id },
        {
          password: 0,
          updatedAt: 0,
          createdAt: 0,
          isDeleted: 0,
          isActive: 0,
          userType: 0,
        }
      )
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(500).send({ message: "internal server error" });
      });
  },
  searchOutletBySearchText: function (req, res) {
    var regex = new RegExp(req.query.text, "i");
    outletModel
      .find({ "brand._id": req.query.id, name: { $regex: regex } })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(500).send({ message: "internal server error" });
      });
  },
};
