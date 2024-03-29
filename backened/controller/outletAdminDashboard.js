var orderModel = require("../model/order.model");
var employeeModel = require("../model/employee.model");
var outletModel = require("../model/outlet.model");
var pipelines = require("../pipelines/outletAdminDashBoard");
var moment = require("moment");
var today = moment();

var startDate = today.startOf("month").toDate();
var endDate = moment().toDate();
module.exports = {
  getBasicData: function (req, res) {
    var id = req.params.id;

    var data1 = outletModel.aggregate(pipelines.productCnt(id));
    var data2 = employeeModel.aggregate(pipelines.employeeCnt(id));
    var data3 = orderModel.aggregate(
      pipelines.totalRevenue(id, startDate, endDate)
    );
    var data4 = orderModel.aggregate(
      pipelines.topCategories(id, startDate, endDate)
    );
    var data5 = orderModel.aggregate(
      pipelines.topProducts(id, startDate, endDate)
    );
    var data6 = orderModel.aggregate(
      pipelines.outletGraphData(id, startDate, endDate)
    );
    var data7 = orderModel.aggregate(
      pipelines.ordersBooked(id, startDate, endDate)
    );
    var data8 = orderModel.aggregate(
      pipelines.orderAnalysis(id, startDate, endDate)
    );
    var data9 = orderModel.aggregate(
      pipelines.bottomProducts(id, startDate, endDate)
    );
    var data10 = orderModel.aggregate(
      pipelines.groupByOrderType(id, startDate, endDate)
    );
    var data11 = orderModel.aggregate(pipelines.topWeekProducts(id));
    var data12 = orderModel.aggregate(
      pipelines.topCustomers(id, startDate, endDate)
    );
    Promise.all([
      data1,
      data2,
      data3,
      data4,
      data5,
      data6,
      data7,
      data8,
      data9,
      data10,
      data11,
      data12,
    ])
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
  getOrderActivity: function (req, res) {
    var id = req.query.id;
    var month = req.query.month;
    var year = req.query.year;
    var sDate = moment({ year, month }).startOf("month").toDate();
    var eDate = moment({ year, month }).endOf("month").toDate();

    var data1 = orderModel.aggregate(pipelines.ordersBooked(id, sDate, eDate));
    var data2 = orderModel.aggregate(
      pipelines.groupByOrderType(id, sDate, eDate)
    );
    Promise.all([data1, data2])
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
  getOutletSale: function (req, res) {
    var month = req.query.month;
    var year = req.query.year;
    var sDate = moment({ year, month }).startOf("month").toDate();
    var eDate = moment({ year, month }).endOf("month").toDate();
    console.log(sDate, eDate);
    orderModel
      .aggregate(pipelines.outletGraphData(req.query.id, sDate, eDate))
      .exec(function (err, result) {
        if (result) {
          // console.log(result);
          return res.send(result);
        } else {
          return res.status(404).send(err);
        }
      });
  },
};
