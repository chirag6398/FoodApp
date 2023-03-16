var productModel = require("../model/product.model");
var categoryModal = require("../model/category.model");
var outletModel = require("../model/outlet.model");
var s3Services = require("../service/awsS3.service");
var mongoose = require("mongoose");

// var uploadToS3=require("../service/awsS3.service");

module.exports = {
  addProduct: function (req, res) {
    console.log(req.body);
    if (req.file) {
      return s3Services
        .uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          console.log(data);
          var image = data.Location;

          var product = new productModel({
            name: req.body.name,
            price: req.body.price,
            "category.name": req.body.categoryName,
            "brand.name": req.body.brandName,
            "brand._id": req.body.brandId,
            "superCategory.name": req.body.superCategoryName,
            "superCategory._id": req.body.superCategoryId,
            "category._id": req.body.categoryId,
            description: req.body.description,
            img: image,
          });
          product
            .save()
            .then(function (result) {
              return res.status(200).send(result);
            })
            .catch(function (err) {
              console.log(err);
              return res.status(500).send({ error: err, status: 500 });
            });
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send({ error: err, status: 500 });
        });
    } else {
      return res.status(500).send({ message: "internal error", status: 500 });
    }
  },
  getProducts: function (req, res) {
    try {
      productModel
        .find(
          {
            "brand._id": req.body.brandId,
            "category._id": req.body.categoryId,
          },
          {
            createdAt: 0,
            isActive: 0,
            isDeleted: 0,
            outletIds: 0,
            updatedAt: 0,
          }
        )
        .then(function (result) {
          return res.status(200).send(result);
        })
        .catch(function (err) {
          return res.status(500).send({ error: err, status: 500 });
        });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: err, status: 500 });
    }
  },
  updateProduct: function (req, res) {
    if (req.file) {
      return s3Services
        .updateToS3(req.file.buffer, req.file.originalname, req.file.mimetype)
        .then(function (data) {
          var image = data.Location;

          var up1 = productModel.findByIdAndUpdate(
            { _id: req.body._id },
            {
              name: req.body.name,
              price: req.body.price,
              description: req.body.description,
              img: image,
            }
          );

          var up2 = outletModel.updateMany(
            {
              $and: [
                { "brand._id": req.body.brandId },
                { "products.product._id": req.body._id },
              ],
            },
            {
              $set: {
                "products.$[el].product.price": req.body.price,
                "products.$[el].product.name": req.body.name,
                "products.$[el].product.description": req.body.description,
                "products.$[el].product.img": image,
              },
            },
            { arrayFilters: [{ "el.product._id": req.body._id }] }
          );

          Promise.all([up1, up2])
            .then(function (result) {
              console.log(result);

              return res.send(result);
            })
            .catch(function (err) {
              return res.status(404).send(err);
            });
        })
        .catch(function (err) {
          return res.status(404).send(err);
        });
    } else {
      var up1 = productModel.findByIdAndUpdate(
        { _id: req.body._id },
        {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        }
      );

      var up2 = outletModel.updateMany(
        {
          $and: [
            { "brand._id": req.body.brandId },
            { "products.product._id": req.body._id },
          ],
        },
        {
          $set: {
            "products.$[el].product.price": req.body.price,
            "products.$[el].product.name": req.body.name,
            "products.$[el].product.description": req.body.description,
          },
        },
        { arrayFilters: [{ "el.product._id": req.body._id }] }
      );

      Promise.all([up1, up2])
        .then(function (result) {
          console.log(result);

          return res.send(result);
        })
        .catch(function (err) {
          return res.status(404).send(err);
        });
    }
  },
  getSuperCategory: function (req, res) {
    console.log(req.params.id);
    categoryModal
      .findById({ _id: req.params.id })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        return res
          .status(500)
          .send({ message: "not able to fetch super category" });
      });
  },
};
