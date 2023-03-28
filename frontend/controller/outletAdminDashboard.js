///<reference path="../module/module.js"/>

app.controller("outletAdminDashboardController", [
  "$scope",
  "outletAdminDashBoardApi",
  "$rootScope",
  "outletApi",
  "$timeout",
  "outletAdminService",
  function (
    $scope,
    outletAdminDashBoardApi,
    $rootScope,
    outletApi,
    $timeout,
    outletAdminService
  ) {
    $scope.isLoading = true;

    $timeout(function () {
      if ($scope.object.myChart1) {
        outletApi.getOutletAdminPage();
      }
    }, 1300);

    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      if (data) {
        $scope.object.outlet = data.data.outletData;

        outletAdminService.getBasicData(
          $scope.object.outlet,
          function (err, result) {
            console.log(err, result);
            $scope.isLoading = false;
            if (result) {
              $scope.object = result;

              if ($scope.object.myChart1) {
                $scope.object.myChart1.destroy();
              }

              $scope.object.myChart1 = outletAdminService.displayGraph(
                $scope.object.outletDates,
                $scope.object.outletRevenue,
                $scope.object.outlet.name,
                document.getElementById("myChart").getContext("2d"),
                $scope.object.myChart1
              );
            }
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
          // console.log(err, result);
          if (result) {
            $scope.object.activity = outletAdminService.getActivityData(
              month,
              result.data[0]
            );

            $scope.object.orderDates = $scope.object.activity.dates;
            $scope.object.orderCnts = $scope.object.activity.activity;
            $scope.object.orderTypeAnalysis = result.data[1];
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

            $scope.object.myChart1 = outletAdminService.displayGraph(
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
