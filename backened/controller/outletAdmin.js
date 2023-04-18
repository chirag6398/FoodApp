var outletModel = require("../model/outlet.model.js");
var brandModel = require("../model/brand.model.js");
var productModel = require("../model/product.model.js");
var categoryModel = require("../model/category.model.js");
var mongoose = require("mongoose");
var employeeModel = require("../model/employee.model.js");
var superCategoryModel = require("../model/superCategory.model.js");
var orderModel = require("../model/order.model.js");

module.exports = {
  getAdminPage: function (req, res) {
    outletModel
      .findById({ _id: req.user.outlet._id })
      .then(function (result) {
        return brandModel
          .findById({ _id: result.brand._id }, { brandLogo: 1 })
          .then(function (brand) {
            return res.status(200).send({
              outletData: result,
              outletAdminData: req.user,
              brandLogo: brand.logo,
              brandId: brand._id,
            });
          })
          .catch(function (err) {
            console.log(err);
            return res.status(500).send({ status: 500, message: "try later" });
          });
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "try later" });
      });
  },
  categoryProduct: function (req, res) {
    console.log(req.body);

    return productModel
      .find({
        "superCategory.category._id": req.body.categoryId,
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
  getSuperCategories: function (req, res) {
    superCategoryModel
      .find({ "brand._id": req.params.id })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      });
  },
  getSubCategories: function (req, res) {
    categoryModel
      .find({ "superCategory._id": req.params.id })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      });
  },
  getOrders: function (req, res) {
    var id = req.query.id;
    var limit = req.query.limit;
    var page = req.query.page;
    var skip = (page - 1) * limit;

    console.log(id);
    orderModel
      .find({ "outlet._id": mongoose.Types.ObjectId(id) })
      .skip(skip)
      .limit(limit)
      .then(function (result) {
        orderModel.countDocuments(
          { "outlet._id": mongoose.Types.ObjectId(id) },
          function (err, count) {
            if (count) {
              return res.status(200).send({ orders: result, count });
            }
          }
        );
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send({ message: "internal server error" });
      });
  },
  addProductToOutlet: function (req, res) {
    var body = req.body;
    mongoose.startSession().then(function (session) {
      session.startTransaction();

      Promise.all([
        outletModel.findByIdAndUpdate(
          { _id: body.outletId },
          {
            $push: {
              products: {
                product: {
                  name: body.name,
                  price: body.price,
                  description: body.description,
                  "superCategory.category._id": body.superCategory.category._id,
                  "superCategory.category.name":
                    body.superCategory.category.name,
                  "superCategory._id": body.superCategory._id,
                  "superCategory.name": body.superCategory.name,
                  _id: body._id,
                  img: body.img,
                },
              },
            },
          },
          { session }
        ),
        productModel.findByIdAndUpdate(
          { _id: body._id },
          {
            $push: {
              outlet: {
                _id: body.outletId,
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
              return res.send(result);
            })
            .catch(function (err) {
              return res.status(404).send(err);
            });
        })
        .catch(function (error) {
          console.log("error in parallel processing", error);
          session
            .abortTransaction()
            .then(function () {
              console.log("transaction aborted");
              session.endSession();
              return res.status(500).send({ error: error });
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
            _id: {
              superCategory: "$products.product.superCategory.name",
              category: "$products.product.superCategory.category.name",
            },
            brandLogo: { $first: "$brand.logo" },
            products: { $push: "$products.product" },
          },
        },
        {
          $sort: { "_id.superCategory": 1 },
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
    var body = req.body;
    console.log(body);

    outletModel
      .updateOne(
        { _id: body.outletId },
        {
          $pull: {
            products: {
              "product.name": body.name,
            },
          },
        }
      )
      .then(function (result1) {
        productModel
          .updateOne(
            { _id: body._id },
            {
              $pull: {
                outlet: {
                  _id: body.outletId,
                },
              },
            }
          )
          .then(function (result2) {
            console.log(result1, result2);
            return res.send({ result1, result2 });
          })
          .catch(function (err) {
            console.log(err);
            return res.status(404).send(err);
          });
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
  createOutletAgent: function (req, res) {
    var body = req.body;
    console.log(body);

    var outletAgent = new employeeModel({
      userName: body.userName,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      number: body.number,
      password: body.password,
      outlet: body.outlet,
      userType: "outletAgent",
      brand: body.brand,
      "location.address": body.address,
      "location.pinCode": body.pinCode,
      "location.city": body.city,
    });

    return outletAgent
      .save()
      .then(function (result) {
        console.log(result);
        return res.status(200).send({
          message: "admin created successfully",
          data: result,
          status: 200,
        });
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
  updateOutletData: function (req, res) {
    var body = req.body;

    outletModel
      .findOneAndUpdate(
        { _id: body._id },
        {
          name: body.name,
          type: body.type,
          description: body.description,
          "contactInfo.number": body.number,
          "contactInfo.email": body.email,
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
    var body = req.body;
    var regex = new RegExp(body.tax.name, "i");
    outletModel
      .findOne({ _id: body._id, "taxes.name": { $regex: regex } }, { taxes: 1 })
      .then(function (result) {
        if (result) {
          return res.status(400).send({ message: "tax name already exist" });
        } else {
          outletModel
            .findOneAndUpdate(
              { _id: body._id },
              { $push: { taxes: body.tax } },
              { new: true, projection: { taxes: 1 } }
            )
            .then(function (result) {
              console.log(result);
              return res.send(result);
            })
            .catch(function (err) {
              return res.status(404).send(err);
            });
        }
      })
      .catch(function (err) {
        return res.status(400).send(err);
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
        return res.status(500).send(err);
      });
  },
  removeTax: function (req, res) {
    var query = req.query;

    outletModel
      .updateOne({ _id: query._id }, { $pull: { taxes: { _id: query.taxId } } })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(500).send(err);
      });
  },
  updateTax: function (req, res) {
    var query = req.query;
    outletModel
      .updateOne(
        { _id: query._id },
        {
          $set: {
            "taxes.$[elem].name": query.taxName,
            "taxes.$[elem].percent": +query.taxPerCent,
          },
        },
        {
          arrayFilters: [
            {
              "elem._id": query.taxId,
            },
          ],
        }
      )
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send(err);
      });
  },
  updateProductPrice: function (req, res) {
    var query = req.query;
    outletModel
      .findOneAndUpdate(
        { _id: query._id },
        { $set: { "products.$[elem].product.price": query.price } },
        { arrayFilters: [{ "elem.product._id": query.productId }] }
      )
      .then(function (result) {
        return res.status(200).send({ message: "price updated" });
      })
      .catch(function (err) {
        console.log(err);
        return res
          .status(500)
          .send({ message: "internal server error please try later" });
      });
  },
  getUsers: function (req, res) {
    var query = req.query;
    var limit = query.limit;
    var page = query.page;
    var skip = (page - 1) * limit;
    var filter = {
      isDeleted: false,
      isActive: true,
      "outlet._id": query.id,
    };
    if (query.email) {
      filter["email"] = query.email;
    }

    if (query.userType) {
      filter["userType"] = query.userType;
    }
    if (query.number && query.number !== "null") {
      filter["number"] = +query.number;
    }

    return employeeModel
      .find(filter, { password: 0, createdAt: 0, updatedAt: 0 })
      .skip(skip)
      .limit(limit)
      .then(function (result) {
        employeeModel.countDocuments(filter, function (err, count) {
          console.log(result, filter);
          return res.send({ data: result, count });
        });
      })
      .catch(function (err) {
        return res.status(500).send(err);
      });
  },
};
