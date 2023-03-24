var orderModel = require("../model/order.model");
var employeeModel = require("../model/employee.model");
var outletModel = require("../model/outlet.model");
var mongoose = require("mongoose");
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
          _id: "$items.superCategory.category.name",
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
        $limit: 5,
      },
    ];

    var pipeline5 = [
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

    var pipeline6 = [
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
          _id: "$outlet._id",
          name: { $first: "$outlet.name" },
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
      {
        $sort: { totalRevenue: 1 },
      },
      {
        $limit: 1,
      },
    ];

    var pipeline7 = [
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
          _id: "$outlet._id",
          name: { $first: "$outlet.name" },
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $limit: 1,
      },
    ];

    var data1 = outletModel.aggregate(pipeline);
    var data2 = employeeModel.aggregate(pipeline1);
    var data3 = orderModel.aggregate(pipeline2);
    var data4 = orderModel.aggregate(pipeline3);
    var data5 = orderModel.aggregate(pipeline4);
    var data6 = orderModel.aggregate(pipeline5);
    var data7 = orderModel.aggregate(pipeline6);
    var data8 = orderModel.aggregate(pipeline7);
    Promise.all([data1, data2, data3, data4, data5, data6, data7, data8])
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
    var pipeline1 = [
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
        $match: {
          status: { $in: ["served", "cancelled"] },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$status",
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
          count: { $sum: 1 },
        },
      },
    ];

    var d1 = orderModel.aggregate(pipeline);
    var d2 = orderModel.aggregate(pipeline1);

    Promise.all([d1, d2])
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send(err);
      });
  },
  getGraphData: function (req, res) {
    var id = req.query.id;
    var month = req.query.month;
    var year = 2023;
    var sDate = moment({ year, month }).startOf("month").toDate();
    var eDate = moment({ year, month }).endOf("month").toDate();
    var pipeline = [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
        },
      },
      {
        $match: {
          createdAt: {
            $gte: sDate,
            $lt: eDate,
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

    return orderModel.aggregate(pipeline).exec(function (err, result) {
      if (result) {
        return res.send(result);
      } else {
        return res.status(404).send(err);
      }
    });
  },
};
