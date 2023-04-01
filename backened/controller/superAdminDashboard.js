var brandModel = require("../model/brand.model");
var orderModel = require("../model/order.model");
var employeeModel = require("../model/employee.model");
var outletModel = require("../model/outlet.model");
var pipelines = require("../pipelines/superAdminDashBoard");
var moment = require("moment");
var async = require("async");
var today = moment();

var startDate = today.startOf("month").toDate();
var endDate = moment().toDate();

module.exports = {
  getBasicData: function (req, res) {
    var data1 = brandModel.aggregate(pipelines.pipelineCnt);
    var data2 = outletModel.aggregate(pipelines.pipelineCnt);
    var data3 = employeeModel.aggregate(pipelines.pipelineCnt);
    var data4 = outletModel.aggregate(pipelines.pipelineGroupBrandWithOutlets);
    var data5 = orderModel.aggregate(pipelines.topBrands(startDate, endDate));
    var data6 = orderModel.aggregate(
      pipelines.lastMonthRevenue(startDate, endDate)
    );
    var data7 = orderModel.aggregate(
      pipelines.outletRanking(startDate, endDate)
    );
    var data8 = employeeModel.aggregate(pipelines.userPerBrand());

    async.waterfall(
      [
        function fetchingTopBrand(cb) {
          orderModel
            .aggregate(pipelines.topTwoBrands(startDate, endDate))
            .exec(function (err, result) {
              if (result) {
                cb(null, result);
              }
            });
        },
        function fetchingGrapgh(result, cb) {
          if (result.length) {
            var topBrand = orderModel.aggregate(
              pipelines.graphData(result[0]._id, startDate, endDate)
            );

            var topBrandOutletCnt = outletModel
              .find({ "brand._id": result[0]._id, isDeleted: false })
              .count();

            var topBrandEmployeeCnt = employeeModel
              .find({ "brand._id": result[0]._id, isDeleted: false })
              .count();

            var topSecondBrand = orderModel.aggregate(
              pipelines.graphData(result[1]._id, startDate, endDate)
            );

            var topSecondBrandOutletCnt = outletModel
              .find({ "brand._id": result[1]._id, isDeleted: false })
              .count();

            var topSecondBrandEmployeeCnt = employeeModel
              .find({ "brand._id": result[1]._id, isDeleted: false })
              .count();

            Promise.all([
              topBrand,
              topBrandOutletCnt,
              topBrandEmployeeCnt,
              topSecondBrand,
              topSecondBrandOutletCnt,
              topSecondBrandEmployeeCnt,
            ]).then(function (result) {
              cb(null, result);
            });
          } else if (result) {
            cb(null, result);
          }
        },
      ],
      function (err, result) {
        if (result) {
          Promise.all([data1, data2, data3, data4, data5, data6, data7, data8])
            .then(function (result1) {
              console.log(result1);
              return res.send(result1.concat(result));
            })
            .catch(function (err) {
              console.log(err);
              return res.status(404).send(err);
            });
        } else {
          return res.status(404).send(err);
        }
      }
    );
  },
  getBrandData: function (req, res) {},
  getBrandGraphData: function (req, res) {
    orderModel
      .aggregate(pipelines.graphData(req.params.id, startDate, endDate))
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
    orderModel
      .aggregate(pipelines.outletGraphData(req.params.id, startDate, endDate))
      .then(function (result) {
        // console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        // console.log(err);
        return res.status(500).send(err);
      });
  },
  getDataOfTopTwoBrands: function (req, res) {
    console.log(req.params.month);
    var month = req.params.month;
    var year = req.params.year;
    var sDate = moment({ year, month }).startOf("month").toDate();
    var eDate = moment({ year, month }).endOf("month").toDate();

    console.log(sDate, eDate);

    async.waterfall(
      [
        function fetchingTopBrand(cb) {
          orderModel
            .aggregate(pipelines.topTwoBrands(sDate, eDate))
            .exec(function (err, result) {
              if (result) {
                cb(null, result);
              }
            });
        },
        function fetchingGrapgh(result, cb) {
          if (result.length) {
            var topBrand = orderModel.aggregate(
              pipelines.graphData(result[0]._id, sDate, eDate)
            );

            var topBrandOutletCnt = outletModel
              .find({ "brand._id": result[0]._id, isDeleted: false })
              .count();

            var topBrandEmployeeCnt = employeeModel
              .find({ "brand._id": result[0]._id, isDeleted: false })
              .count();

            var topSecondBrand = orderModel.aggregate(
              pipelines.graphData(result[1]._id, sDate, eDate)
            );

            var topSecondBrandOutletCnt = outletModel
              .find({ "brand._id": result[1]._id, isDeleted: false })
              .count();

            var topSecondBrandEmployeeCnt = employeeModel
              .find({ "brand._id": result[1]._id, isDeleted: false })
              .count();

            Promise.all([
              topBrand,
              topBrandOutletCnt,
              topBrandEmployeeCnt,
              topSecondBrand,
              topSecondBrandOutletCnt,
              topSecondBrandEmployeeCnt,
            ]).then(function (result) {
              cb(null, result);
            });
          } else if (result) {
            cb(null, result);
          }
        },
      ],
      function (err, result) {
        console.log(err, result);
        if (result) {
          return res.send(result);
        } else {
          return res.status(404).send(err);
        }
      }
    );
  },
  searchDashBoardBrandBySearchText: function (req, res) {
    outletModel
      .aggregate(
        pipelines.pipelineGroupBrandWithOutletsBySearchText(
          req.params.searchText
        )
      )
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(500).send(err);
      });
  },
};
