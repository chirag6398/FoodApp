var mongoose = require("mongoose");
module.exports = {
  productCnt: function (id) {
    return [
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: null,
          productCount: { $sum: 1 },
        },
      },
    ];
  },
  employeeCnt: function (id) {
    return [
      {
        $match: {
          "outlet._id": mongoose.Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: null,
          employeeCount: { $sum: 1 },
        },
      },
    ];
  },
  totalRevenue: function (id, startDate, endDate) {
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
          _id: "$items.superCategory.category._id",
          categoryName: { $first: "$items.superCategory.category.name" },
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
          _id: "$items._id",
          productName: { $first: "$items.name" },
          img: { $first: "$items.img" },
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 4,
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
  ordersBooked: function (id, startDate, endDate) {
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
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ];
  },
  orderAnalysis: function (id, startDate, endDate) {
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
  },
  bottomProducts: function (id, startDate, endDate) {
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
          _id: "$items._id",
          productName: { $first: "$items.name" },
          img: { $first: "$items.img" },
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      {
        $sort: { totalQuantity: 1 },
      },
      {
        $limit: 3,
      },
    ];
  },
};
