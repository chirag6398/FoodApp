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
    var pipeline = [
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ];

    var pipeline1 = [
      {
        $group: {
          _id: "$brand._id",
          name: { $first: "$brand.name" },
          logo: { $first: "$brand.logo" },
          outlets: { $push: { name: "$name", _id: "$_id" } },
        },
      },
      {
        $sort: { name: 1 },
      },
    ];

    var pipeline2 = [
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
          _id: {
            brand: "$brand.name",
            date: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          },
          brandName: { $first: "$brand.name" },
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $group: {
          _id: "$_id.date",
          brands: {
            $push: {
              brand: "$_id.brand",
              revenue: "$totalRevenue",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          brands: { $slice: ["$brands", 4] },
        },
      },
    ];

    var pipeline3 = [
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
          lastMonthRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
    ];

    var data1 = brandModel.aggregate(pipeline);
    var data2 = outletModel.aggregate(pipeline);
    var data3 = employeeModel.aggregate(pipeline);
    var data4 = outletModel.aggregate(pipeline1);
    var data5 = orderModel.aggregate(pipeline2);
    var data6 = orderModel.aggregate(pipeline3);

    Promise.all([data1, data2, data3, data4, data5, data6])
      .then(function (result) {
        // console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
  getBrandData: function (req, res) {
    var pipeline1 = [
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },

          count: {
            $sum: 1,
          },
        },
      },
    ];

    var data1 = brandModel.aggregate(pipeline1);

    var data2 = outletModel.aggregate(pipeline1);

    Promise.all([data1, data2])
      .then(function (result) {
        // console.log(result);
      })
      .catch(function (err) {
        // console.log(err);
      });
  },
  getBrandGraphData: function (req, res) {
    var pipeline = [
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
        // console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        // console.log(err);
        return res.status(500).send(err);
      });
  },
  getOutletGraphData: function (req, res) {
    // console.log(req.params.id);
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
        // console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        // console.log(err);
        return res.status(500).send(err);
      });
  },
};
