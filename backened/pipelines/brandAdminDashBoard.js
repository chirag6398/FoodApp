var mongoose = require("mongoose");
module.exports = {
  outletNamesAndCnt: function (id) {
    return [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
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
  },
  employeeCnt: function (id) {
    return [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
        },
      },
      {
        $match: {
          userType: { $ne: "brandAdmin" },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ];
  },
  totalRevenue: function (id) {
    return [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
        },
      },
      // {
      //   $match: {
      //     createdAt: {
      //       $gte: startDate,
      //       $lt: endDate,
      //     },
      //   },
      // },
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
  },
  topCategories: function (id, startDate, endDate) {
    return [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
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
  },
  topProducts: function (id, startDate, endDate) {
    return [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
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
  },
  brandGraphData: function (id, startDate, endDate) {
    console.log("brandGraphData", startDate, endDate);
    return [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
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
  },
  bottomOutlet: function (id, startDate, endDate) {
    return [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
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
  },
  topOutlet: function (id, startDate, endDate) {
    return [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
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
  },
  outletGraphData: function (id, startDate, endDate) {
    return [
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
  },
  outletOrderAnalysis: function (id, startDate, endDate) {
    return [
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
          status: { $in: ["completed", "served", "cancelled"] },
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
      {
        $sort: { _id: -1 },
      },
    ];
  },
  ordersBooked: function (id, startDate, endDate) {
    return [
      {
        $match: {
          "brand._id": mongoose.Types.ObjectId(id),
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
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ];
  },
};
