var outletModel = require("../model/outlet.model");
var mongoose = require("mongoose");
const orderModel = require("../model/order.model");
var moment = require("moment");

var startDate = moment().subtract(1, "month").toDate();
var endDate = moment().toDate();

module.exports = {
  getOutletAgentPage: function (req, res) {
    if (req.user.userType === "outletAgent") {
      return outletModel
        .findById({ _id: req.user.outlet._id })
        .then(function (result) {
          return res.send({ outlet: result, agent: req.user });
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send(err);
        });
    } else {
      return res.status(404).send({ message: "unauthorized" });
    }
  },

  getProductByName: function (req, res) {
    console.log(req.params.searchText, req.params._id);
    var regex = new RegExp(req.params.searchText, "i");
    var pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params._id),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          products: 1,
        },
      },
      {
        $match: {
          "products.product.name": { $regex: regex },
        },
      },
    ];

    outletModel.aggregate(pipeline).exec(function (err, result) {
      console.log(err, result);
      if (result) return res.send(result);
      return res.status(404).send(err);
    });
  },
  getRecommendedProduct: function (req, res) {
    console.log(req.query.products);
    var products = req.query.products.split(",");
    var id = req.query.id;
    console.log(products);
    orderModel
      .aggregate([
        {
          $match: {
            "outlet._id": mongoose.Types.ObjectId(id),
          },
        },
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $match: {
            "items.name": { $all: products },
          },
        },
        {
          $unwind: "$items",
        },

        {
          $group: {
            _id: "_id",
            items: { $push: "$items" },
          },
        },
        {
          $unwind: "$items",
        },
        {
          $match: {
            "items.name": { $nin: products },
          },
        },
        {
          $group: {
            _id: "$items._id",
            name: { $first: "$items.name" },
            price: { $first: "$items.price" },
            superCategory: { $first: "$items.superCategory" },
            img: { $first: "$items.img" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 3,
        },
      ])
      .exec(function (err, result) {
        if (result) {
          console.log(result);
          return res.send(result);
        } else {
          return res.status(404).send(err);
        }
      });
  },
};
