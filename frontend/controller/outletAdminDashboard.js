///<reference path="../module/module.js"/>

app.controller("outletAdminDashboardController", [
  "$scope",
  "superAdminService",
  "outletAdminDashBoardApi",
  "$rootScope",
  "outletApi",
  "$timeout",
  "outletAdminService",
  function (
    $scope,
    superAdminService,
    outletAdminDashBoardApi,
    $rootScope,
    outletApi,
    $timeout,
    outletAdminService
  ) {
    $scope.object = {
      myChart1: null,
      totalProduct: 0,
      totalEmployees: 0,
      totalRevenue: 0,
      topTenCategories: null,
      topTenProducts: null,
      outletDates: [0],
      outletRevenue: [0],
      outlet: null,
      isLoading: true,
      orderDates: [],
      orderCnts: [],
      months: [
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
      ],
      month: null,
      month1: null,
    };

    $timeout(function () {
      if ($scope.object.outlet === null) {
        outletApi.getOutletAdminPage();
      }
    }, 1300);
    $scope.object.two = 2;
    $scope.object.one = 1;
    $rootScope.$on("passData", function (err, data) {
      if (data) {
        $scope.object.outlet = data.data.outletData;

        outletAdminDashBoardApi.getBasicData(
          $scope.object.outlet._id,
          function (err, result) {
            console.log(result);
            $scope.object.isLoading = false;
            $scope.object.totalProduct = result.data[0][0].productCount;
            $scope.object.totalEmployees = result.data[1][0].employeeCount;
            $scope.object.totalRevenue = result.data[2][0].totalRevenue;
            $scope.object.topTenCategories = result.data[3];
            $scope.object.topTenProducts = result.data[4];
            $scope.object.outletDates = [0];
            $scope.object.outletRevenue = [0];
            $scope.object.month = new Date().getMonth();
            $scope.object.month1 = $scope.object.month;
            $scope.object.activity = outletAdminService.getOutletGraphData(
              $scope.object.month,
              result.data[5]
            );

            $scope.object.outletDates = $scope.object.activity.dates;
            $scope.object.outletRevenue = $scope.object.activity.activity;

            $scope.object.activity = outletAdminService.getActivityData(
              $scope.object.month,
              result.data[6]
            );
            $scope.object.orderDates = $scope.object.activity.dates;
            $scope.object.orderCnts = $scope.object.activity.activity;

            if ($scope.object.myChart1) {
              $scope.object.myChart1.destroy();
            }

            $scope.object.myChart1 = superAdminService.displayGraph(
              $scope.object.outletDates,
              $scope.object.outletRevenue,
              $scope.object.outlet.name,
              document.getElementById("myChart").getContext("2d"),
              $scope.object.myChart1
            );
          }
        );
      }
    });

    $scope.getOrderActivity = function (month) {
      $scope.object.month = month;

      outletAdminDashBoardApi.getOrderActivity(
        month,
        $scope.object.outlet._id,
        function (err, result) {
          console.log(err, result);
          if (result) {
            $scope.object.activity = outletAdminService.getActivityData(
              month,
              result.data
            );

            $scope.object.orderDates = $scope.object.activity.dates;
            $scope.object.orderCnts = $scope.object.activity.activity;
          }
        }
      );
    };

    $scope.getGraphData = function (month) {
      $scope.object.month1 = month;
      outletAdminDashBoardApi.getGraphData(
        month,
        $scope.object.outlet._id,
        function (err, result) {
          if (result) {
            $scope.object.activity = outletAdminService.getOutletGraphData(
              $scope.object.month1,
              result.data
            );

            $scope.object.outletDates = $scope.object.activity.dates;
            $scope.object.outletRevenue = $scope.object.activity.activity;

            if ($scope.object.myChart1) {
              $scope.object.myChart1.destroy();
            }

            $scope.object.myChart1 = superAdminService.displayGraph(
              $scope.object.outletDates,
              $scope.object.outletRevenue,
              $scope.object.outlet.name,
              document.getElementById("myChart").getContext("2d"),
              $scope.object.myChart1
            );
          }
        }
      );
    };
  },
]);
