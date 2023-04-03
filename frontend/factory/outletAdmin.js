///<reference path="../module/module.js"/>

app.factory(
  "outletAdminFactory",
  function (outletApi, outletAdminDashBoardApi, $anchorScroll, $location) {
    var obj = {};

    obj.scrollToSubCategory = function () {
      $location.hash("subCategory");

      $anchorScroll();
    };

    obj.getPages = function (totalCount, limit) {
      var totalPage = Math.ceil(totalCount / limit);
      var pages = new Array(totalPage).fill(0);

      return pages;
    };

    obj.getUsers = function (data, cb) {
      var outlet = data.data.outletData;
      var brand = data.data.outletData.brand;
      var users = [];
      var filter = {
        email: "",
        userType: "",
        number: "",
      };
      var limit = 5;
      var page = 1;
      var pages = null;
      var totalCount = 0;
      var totalPage = 1;
      var one = 1;
      var searchUser = "";
      var searchTextResult = [];
      outletApi.getUsers(
        outlet._id,
        limit,
        page,
        filter,
        function (err, result) {
          if (result) {
            console.log(result);
            users = result.data.data;
            totalCount = result.data.count;
            totalPage = Math.ceil(totalCount / limit);
            pages = obj.getPages(totalCount, limit);

            cb(null, {
              users,
              brand,
              outlet,
              limit,
              page,
              one,
              searchTextResult,
              searchUser,
              pages,
              totalCount,
              totalPage,
              filter,
            });
          } else {
            cb(err, null);
          }
        }
      );
    };

    obj.displayGraph = function (dates, revenue, name, ctx) {
      var chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              data: revenue,
              label: name,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.3,
            },
          ],
        },
      });
      return chart;
    };

    obj.scrollToProducts = function () {
      $location.hash("product");

      $anchorScroll.yOffset = 60;
      $anchorScroll("product");
    };

    obj.getSuperCategories = function (id, cb) {
      outletApi.getSuperCategories(id, cb);
    };

    obj.getSubCategory = function (id, cb) {
      outletApi.getSubCategory(id, cb);
    };

    obj.getProducts = function (categoryId, outletId, cb) {
      outletApi.getProductByCategory({ categoryId, outletId }, cb);
    };

    obj.createOutletAgent = function (agent, outlet, cb) {
      outletApi.createOutletAgent(
        {
          ...agent,
          brand: outlet.brand,
          outlet: {
            _id: outlet._id,
            type: outlet.type,
            name: outlet.name,
          },
        },
        cb
      );
    };

    obj.getOutletAgentEmployees = function (id, cb) {
      outletApi.getOutletAgentEmployees(id, cb);
    };

    obj.addTax = function (id, tax, cb) {
      outletApi.addTax({ _id: id, tax: tax }, cb);
    };

    obj.saveTableView = function (id, tables, cb) {
      outletApi.saveTableView({ _id: id, tables: tables }, cb);
    };

    obj.addProductToOutlet = function (product, outletId, cb) {
      outletApi.addProductToOutlet(product, outletId, cb);
    };

    obj.isExistTable = function (table, tables) {
      var ind = tables.findIndex(function (value) {
        return +value.number === table.number;
      });
      console.log(table, tables, ind);
      return ind >= 0;
    };

    obj.getIndx = function (array, value) {
      return array.findIndex(function (element) {
        return element._id === value._id;
      });
    };

    var monthDetails = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    obj.getActivityData = function (month, data) {
      var dates = [];
      var activity = [""];
      for (var i = 1; i <= monthDetails[month]; i++) {
        dates.push(i);
        var str = "0 orders booked on " + i;
        activity.push(str);
      }
      if (data) {
        data.forEach(function (value) {
          var date = +value._id.substr(0, 2);

          activity[date] = value.count + " orders booked on " + date;
        });
      }
      return {
        dates,
        activity,
      };
    };

    obj.getOutletGraphData = function (month, data) {
      var dates = [0];
      var activity = [0];
      for (var i = 1; i <= monthDetails[month]; i++) {
        dates.push(i);

        activity.push(0);
      }
      if (data) {
        data.forEach(function (value) {
          var date = +value._id.substr(0, 2);
          activity[date] = value.totalRevenue;
        });
      }
      return {
        dates,
        activity,
      };
    };

    obj.getOrderAnalysis = function (data) {
      var orderAnalysis = {
        totalOrders: 0,
        successRate: 0,
        cancellationRate: 0,
      };

      if (data.length === 2) {
        orderAnalysis.totalOrders = data[0].count + data[1].count;
        orderAnalysis.successRate =
          (data[0].count / orderAnalysis.totalOrders) * 100;
        orderAnalysis.cancellationRate =
          (data[1].count / orderAnalysis.totalOrders) * 100;
      }

      return orderAnalysis;
    };

    obj.getBasicData = function (outlet, cb) {
      var months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var one = 1;
      var myChart1 = null;
      var currentYear1 = new Date().getFullYear();
      var currentYear2 = currentYear1;

      outletAdminDashBoardApi.getBasicData(outlet._id, function (err, result) {
        var totalRevenue = 0;
        var totalProduct = 0;
        var totalEmployees = 0;
        if (result) {
          console.log(result);
          var data = result.data;
          if (data[0].length) totalProduct = data[0][0].productCount;
          if (data[1].length) totalEmployees = data[1][0].employeeCount;
          if (data[2].length) totalRevenue = data[2][0].totalRevenue;
          var topTenCategories = data[3];
          var topTenProducts = data[4];
          var ordersAnalysis = obj.getOrderAnalysis(data[7]);
          var orderTypeAnalysis = data[9];
          var bottomProducts = data[8];
          var topWeekProducts = data[10];
          var topCustomer = data[11];
          var month = new Date().getMonth();
          var month1 = month;
          var activity = obj.getOutletGraphData(month, data[5]);

          var outletDates = activity.dates;
          var outletRevenue = activity.activity;

          activity = obj.getActivityData(month, data[6]);
          console.log(activity);
          var orderDates = activity.dates;
          var orderCnts = activity.activity;

          cb(null, {
            totalEmployees,
            totalProduct,
            totalRevenue,
            topTenCategories,
            topTenProducts,
            ordersAnalysis,
            orderTypeAnalysis,
            bottomProducts,
            month,
            currentYear1,
            currentYear2,
            month1,
            outletDates,
            outletRevenue,
            orderDates,
            orderCnts,
            months,
            one,
            myChart1,
            outlet,
            topWeekProducts,
            topCustomer,
          });
        } else {
          cb(err, null);
        }
      });
    };
    return obj;
  }
);
