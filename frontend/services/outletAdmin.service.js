///<reference path="../module/module.js"/>

app.service(
  "outletAdminService",
  function (outletApi, $stateParams, $anchorScroll, $location) {
    this.scrollToSubCategory = function () {
      $location.hash("subCategory");

      $anchorScroll();
    };

    this.displayGraph = function (dates, revenue, name, ctx, chart) {
      chart = new Chart(ctx, {
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

    this.scrollToProducts = function () {
      $location.hash("product");

      $anchorScroll.yOffset = 60;
      $anchorScroll("product");
    };

    this.getSuperCategories = function (id, cb) {
      outletApi.getSuperCategories(id, cb);
    };

    this.getSubCategory = function (id, cb) {
      outletApi.getSubCategory(id, cb);
    };

    this.getProducts = function (categoryId, outletId, cb) {
      outletApi.getProductByCategory({ categoryId, outletId }, cb);
    };

    this.createOutletAgent = function (agent, outlet, cb) {
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

    this.getOutletAgentEmployees = function (id, cb) {
      outletApi.getOutletAgentEmployees(id, cb);
    };

    this.addTax = function (id, tax, cb) {
      outletApi.addTax({ _id: id, tax: tax }, cb);
    };

    this.saveTableView = function (id, tables, cb) {
      outletApi.saveTableView({ _id: id, tables: tables }, cb);
    };

    this.addProductToOutlet = function (product, outletId, cb) {
      outletApi.addProductToOutlet(product, outletId, cb);
    };

    this.isExistTable = function (table, tables) {
      var ind = tables.findIndex(function (value) {
        return +value.number === table.number;
      });
      console.log(table, tables, ind);
      return ind >= 0;
    };

    this.getIndx = function (array, value) {
      return array.findIndex(function (element) {
        return element._id === value._id;
      });
    };

    var monthDetails = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.getActivityData = function (month, data) {
      var dates = [0];
      var activity = [""];
      for (var i = 1; i <= monthDetails[month]; i++) {
        dates.push(i);
        var str = "0 orders booked on " + i;
        activity.push(str);
      }
      if (data) {
        data.forEach(function (value) {
          var date = +value._id.substr(0, 2);
          activity[date - 1] = value.count + " orders booked on " + date;
        });
      }
      return {
        dates,
        activity,
      };
    };

    this.getOutletGraphData = function (month, data) {
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

    this.getOrderAnalysis = function (data) {
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
  }
);
