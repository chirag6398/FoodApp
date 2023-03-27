var mongoose = require("mongoose");
module.exports = {
  pipelineCnt: [
    {
      $match: {
        isDeleted: false,
        isActive: true,
      },
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
      },
    },
  ],
  pipelineGroupBrandWithOutlets: [
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
  ],
  topBrands: function (startDate, endDate) {
    return [
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
        },
      },
      {
        $sort: { revenue: -1 },
      },
      {
        $limit: 4,
      },
    ];
  },
  lastMonthRevenue: function (startDate, endDate) {
    return [
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
  },
  topTwoBrands: function (startDate, endDate) {
    return [
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
        $limit: 2,
      },
    ];
  },
  graphData: function (id, startDate, endDate) {
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
    ];
  },
  outletRanking: function (startDate, endDate) {
    return [
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
        $sort: { _id: 1 },
      },
    ];
  },
  userPerBrand: function () {
    return [
      {
        $match: {
          userType: { $ne: "superAdmin" },
        },
      },
      {
        $group: {
          _id: "$brand._id",
          name: { $first: "$brand.name" },
          employeeCnt: { $sum: 1 },
        },
      },
    ];
  },
};
