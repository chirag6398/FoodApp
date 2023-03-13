var brandModel = require("../model/brand.model");
var outletModel = require("../model/outlet.model");
var validation = require("../service/validation.service");
var employeeModel = require("../model/employee.model");
var superCategoryModel = require("../model/superCategory.model");
var categoryModel = require("../model/category.model");
var mongoose = require("mongoose");
var awsService = require("../service/awsS3.service");
module.exports = {
  getBrandAdminPage: function (req, res) {
    if (req.user.userType == "brandAdmin") {
      brandModel
        .findById({ _id: req.user.brand._id })
        .then(function (result) {
          return res.status(200).send({ data: result, status: 200 });
        })
        .catch(function (err) {
          return res
            .status(500)
            .send({ error: "internal server error", status: 500 });
        });
    } else {
      return res.status(401).send({ message: "unauthorized", status: 401 });
    }
  },

  createOutlet: function (req, res) {
    console.log(req.body);

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
        console.log("fenfi", err);
        return res
          .status(400)
          .send({ message: "please enter valid and unique data", status: 400 });
      });
  },

  getOutlets: function (req, res) {
    console.log(req.params);

    outletModel
      .find({ "brand._id": req.params.id })
      .then(function (result) {
        console.log(result);
        return res.status(200).send({ data: result, status: 200 });
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

    var valid = validation.validateUserData(req, res);

    console.log(valid);
    if (
      valid &&
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
        "outlet.location": req.body.location,
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
              return res
                .status(200)
                .send({ message: "admin created successfully", status: 200 });
            })
            .catch(function (err) {
              // console.log(err);
              return res
                .status(500)
                .send({ error: "internal server error", status: 500 });
            });
        })
        .catch(function (err) {
          // console.log(err);
          return res
            .status(500)
            .send({ error: "internal server error", status: 500 });
        });
    } else {
      return res.status(404).send({ error: "data not found", status: 404 });
    }
  },

  addCategory: function (req, res) {
    console.log(req.body, req.file);

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
                .send({ error: "internal server error", status: 500 });
            });
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send({ error: err, status: 500 });
        });
    } else {
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
        return res.status(500).send({ error: err, status: 500 });
      });
  },

  addSuperCategory: function (req, res) {
    console.log(req.body);
    console.log(req.file);
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
          superCategory
            .save()
            .then(function (result) {
              return res.send(result);
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
      return res.status(401).send({ message: "try later" });
    }
  },

  getSuperCategory: function (req, res) {
    // console.log(req.params.id)
    superCategoryModel
      .find({ "brand._id": mongoose.Types.ObjectId(req.params.id) })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      });
    //send super category
  },

  getBrandUsers: function (req, res) {
    console.log(req.params.id);
    employeeModel
      .find({
        "brand._id": req.params.id,
        userType: { $nin: ["superAdmin", "brandAdmin"] },
      })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      });
  },

  updateSuperCategory: function (req, res) {
    if (req.file) {
      return awsService
        .updateToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          console.log(data);
          var image = data.Location;

          superCategoryModel
            .findByIdAndUpdate(
              { _id: req.body._id },
              {
                name: req.body.name,
                logo: image,
              }
            )
            .then(function (result) {
              return res.send({ message: "updated" });
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
      superCategoryModel
        .findByIdAndUpdate(
          { _id: req.body._id },
          {
            name: req.body.name,
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

  updateCategory: function (req, res) {
    if (req.file) {
      return awsService
        .updateToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          console.log(data);
          var image = data.Location;

          categoryModel
            .findByIdAndUpdate(
              { _id: req.body._id },
              {
                name: req.body.name,
                logo: image,
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
      categoryModel
        .findByIdAndUpdate(
          { _id: req.body._id },
          {
            name: req.body.name,
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
  getOutlet: function (req, res) {
    outletModel
      .findById({ _id: req.params.id })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send(err);
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
        return res.status(404).send(err);
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
        return res.status(404).send(err);
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
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(404).send(err);
      });
  },
};
