var brandModel = require("../model/brand.model");
var orderModel = require("../model/order.model");
var employeeModel = require("../model/employee.model");
var outletModel = require("../model/outlet.model");
var categoryModel = require("../model/category.model");
var superCategory = require("../model/superCategory.model");
var mongoose = require("mongoose");
var productModel = require("../model/product.model");
var moment = require("moment");
var async = require("async");

var startDate = moment().subtract(1, "month").toDate();
var yesterDay = moment().subtract(1, "day").toDate();
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
          _id: "$_id.brand",
          revenue: {
            $sum: "$totalRevenue",
          },
          // brands: {
          //   $push: {
          //     brand: "$_id.brand",
          //     revenue: "$totalRevenue",
          //   },
          // },
        },
      },
      {
        $sort: { revenue: -1 },
      },
      {
        $limit: 4,
      },
      // {
      //   $project: {
      //     _id: 0,
      //     date: "$_id",
      //     brands: { $slice: ["$brands", 4] },
      //   },
      // },
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

    // var pipeline4 = [
    //   {
    //     $match: {
    //       createdAt: {
    //         $gte: startDate,
    //         $lt: endDate,
    //       },
    //     },
    //   },
    //   {
    //     $unwind: "$items",
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         brand: "$brand.name",
    //         date: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
    //       },
    //       brandName: { $first: "$brand.name" },
    //       totalRevenue: {
    //         $sum: { $multiply: ["$items.quantity", "$items.price"] },
    //       },
    //     },
    //   },
    //   {
    //     $sort: { totalRevenue: -1 },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id.date",
    //       name: { $first: "$_id.brand" },
    //       revenues: {
    //         $push: "$totalRevenue",
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       date: "$_id",
    //       name: "$name",
    //       brands: { $slice: ["$revenues", 1] },
    //     },
    //   },
    // ];
    var data1 = brandModel.aggregate(pipeline);
    var data2 = outletModel.aggregate(pipeline);
    var data3 = employeeModel.aggregate(pipeline);
    var data4 = outletModel.aggregate(pipeline1);
    var data5 = orderModel.aggregate(pipeline2);
    var data6 = orderModel.aggregate(pipeline3);

    async.waterfall(
      [
        function fetchingTopBrand(cb) {
          orderModel
            .aggregate([
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
                  _id: "$brand._id",
                  name: { $first: "$brand.name" },
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
            ])
            .exec(function (err, result) {
              if (result) {
                cb(null, result);
              }
            });
        },
        function fetchingGrapgh(result, cb) {
          // console.log(result);
          if (result) {
            orderModel
              .aggregate([
                {
                  $match: {
                    "brand._id": mongoose.Types.ObjectId(result[0]._id),
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
                    _id: {
                      $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
                    },
                    name: { $first: "$brand.name" },
                    totalRevenue: {
                      $sum: { $multiply: ["$items.quantity", "$items.price"] },
                    },
                  },
                },
                {
                  $sort: { _id: 1 },
                },
              ])
              .exec(function (err, result) {
                if (result) {
                  cb(null, result);
                }
              });
          }
        },
      ],
      function (err, result) {
        if (result) {
          Promise.all([data1, data2, data3, data4, data5, data6])
            .then(function (result1) {
              // console.log(result);
              return res.send(result1.concat([result]));
            })
            .catch(function (err) {
              console.log(err);
              return res.status(404).send(err);
            });
        }
      }
    );

    // var data7 = orderModel.aggregate(pipeline4);
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
      .then(function (result) {})
      .catch(function (err) {});
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
