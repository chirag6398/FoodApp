var brandModel = require("../model/brand.model");
var orderModel = require("../model/order.model");
var employeeModel = require("../model/employee.model");
var outletModel = require("../model/outlet.model");
var categoryModel = require("../model/category.model");
var superCategory = require("../model/superCategory.model");
var mongoose = require("mongoose");
var productModel = require("../model/product.model");
var moment = require("moment");

var startDate = moment().subtract(1, "month").toDate();
var endDate = moment().toDate();
module.exports = {
  getBasicData: function (req, res) {
    console.log(req.params.id);
    //outlet names and count
    var pipeline = [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: null,
          names: { $push: { name: "$name", _id: "$_id" } },
          count: { $sum: 1 },
        },
      },
    ];
    //total employee under this brand
    var pipeline1 = [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ];
    //confuse ki $match konsa best hoga pehle rkhna:(total revenue)
    var pipeline2 = [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(req.params.id),
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
        $unwind: "$items",
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
    ];
    //top category products

    var pipeline3 = [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(req.params.id),
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
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.category.name",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 10,
      },
    ];
    //top ten products
    var pipeline4 = [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(req.params.id),
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
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.name",
          img: { $first: "$items.img" },
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 10,
      },
    ];

    var data1 = outletModel.aggregate(pipeline);
    var data2 = employeeModel.aggregate(pipeline1);
    var data3 = orderModel.aggregate(pipeline2);
    var data4 = orderModel.aggregate(pipeline3);
    var data5 = orderModel.aggregate(pipeline4);

    Promise.all([data1, data2, data3, data4, data5])
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
  getOutletGraphData: function (req, res) {
    console.log(req.params.id);
    var pipeline = [
      {
        $match: {
          "outlet._id": mongoose.Types.ObjectId(req.params.id),
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
        $unwind: "$items",
      },
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];
    orderModel
      .aggregate(pipeline)
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send(err);
      });
  },
};
