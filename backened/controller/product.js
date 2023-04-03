var productModel = require("../model/product.model");
var categoryModal = require("../model/category.model");
var outletModel = require("../model/outlet.model");
var s3Services = require("../service/awsS3.service");

module.exports = {
  addProduct: function (req, res) {
    var body = req.body;
    var file = req.file;
    return categoryModal
      .findById({ _id: body.categoryId }, { brand: 1, superCategory: 1 })
      .then(function (result) {
        if (file) {
          return s3Services
            .uploadToS3(file.buffer, file.originalname, file.mimetype)
            .then(function (data) {
              console.log(data);
              var image = data.Location;

              var product = new productModel({
                name: body.name,
                price: body.price,
                "superCategory.category.name": body.categoryName,
                brand: result.brand,
                superCategory: result.superCategory,
                "superCategory.category._id": body.categoryId,
                description: body.description,
                img: image,
              });
              productModel
                .findOne({ "brand._id": result.brand._id, name: body.name })
                .then(function (result) {
                  if (result) {
                    return res
                      .status(400)
                      .send({ message: "product name should be unique" });
                  } else {
                    return product
                      .save()
                      .then(function (result) {
                        return res.status(200).send(result);
                      })
                      .catch(function (err) {
                        console.log(err);
                        return res
                          .status(500)
                          .send({ error: err, status: 500 });
                      });
                  }
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
          return res.status(404).send({ err: "file not found" });
        }
      })
      .catch(function (err) {
        return res.status(404).send(err);
      });
  },
  getProducts: function (req, res) {
    try {
      productModel
        .find(
          {
            "superCategory.category._id": req.body.categoryId,
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
    var file = req.file;
    var body = req.body;

    if (file) {
      return s3Services
        .updateToS3(file.buffer, file.originalname, file.mimetype)
        .then(function (data) {
          var image = data.Location;

          var up1 = productModel.findByIdAndUpdate(
            { _id: body._id },
            {
              name: body.name,
              price: body.price,
              description: body.description,
              img: image,
            }
          );

          var up2 = outletModel.updateMany(
            {
              $and: [
                { "brand._id": body.brandId },
                { "products.product._id": body._id },
              ],
            },
            {
              $set: {
                "products.$[el].product.price": body.price,
                "products.$[el].product.name": body.name,
                "products.$[el].product.description": body.description,
                "products.$[el].product.img": image,
              },
            },
            { arrayFilters: [{ "el.product._id": body._id }] }
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
        { _id: body._id },
        {
          name: body.name,
          price: body.price,
          description: body.description,
        }
      );

      var up2 = outletModel.updateMany(
        {
          $and: [
            { "brand._id": body.brandId },
            { "products.product._id": body._id },
          ],
        },
        {
          $set: {
            "products.$[el].product.price": body.price,
            "products.$[el].product.name": body.name,
            "products.$[el].product.description": body.description,
          },
        },
        { arrayFilters: [{ "el.product._id": body._id }] }
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
