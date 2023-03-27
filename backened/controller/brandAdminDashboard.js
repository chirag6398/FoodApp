var orderModel = require("../model/order.model");
var employeeModel = require("../model/employee.model");
var outletModel = require("../model/outlet.model");
var pipelines = require("../pipelines/brandAdminDashBoard");
var moment = require("moment");

var startDate = moment().subtract(1, "month").toDate();
var endDate = moment().toDate();
module.exports = {
  getBasicData: function (req, res) {
    var id = req.params.id;

    var data1 = outletModel.aggregate(pipelines.outletNamesAndCnt(id));
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
      pipelines.brandGraphData(id, startDate, endDate)
    );
    var data7 = orderModel.aggregate(
      pipelines.bottomOutlet(id, startDate, endDate)
    );
    var data8 = orderModel.aggregate(
      pipelines.topOutlet(id, startDate, endDate)
    );
    var data9 = orderModel.aggregate(
      pipelines.ordersBooked(id, startDate, endDate)
    );

    Promise.all([data1, data2, data3, data4, data5, data6, data7, data8, data9])
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
    var id = req.params.id;

    var d1 = orderModel.aggregate(
      pipelines.outletGraphData(id, startDate, endDate)
    );
    var d2 = orderModel.aggregate(
      pipelines.outletOrderAnalysis(id, startDate, endDate)
    );

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

    var d1 = orderModel.aggregate(pipelines.brandGraphData(id, sDate, eDate));
    var d2 = orderModel.aggregate(pipelines.ordersBooked(id, sDate, eDate));

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
};
