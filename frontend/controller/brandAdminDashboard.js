///<reference path="../module/module.js"/>

app.controller("brandAdminDashboardController", [
  "$scope",
  "$rootScope",
  "brandApi",
  "brandAdminDashBoardApi",
  "$timeout",
  "brandAdminService",
  "superAdminService",
  function (
    $scope,
    $rootScope,
    brandApi,
    brandAdminDashBoardApi,
    $timeout,
    brandAdminService,
    superAdminService
  ) {
    // $timeout(function () {
    //   if ($scope.object.myChart1 === null) {
    brandApi.getBrandAdminPage();
    //   }
    // }, 1300);

    $scope.isLoading = true;

    $rootScope.$on("passData", function (err, result) {
      if (result) {
        console.log(result);
        brandAdminService.getBasicData(result, function (err, result) {
          console.log(result);
          $scope.isLoading = false;
          $scope.object = result;

          if ($scope.object.myChart1) {
            $scope.object.myChart1.destroy();
          }

          $scope.object.myChart1 = superAdminService.displayGraph(
            $scope.object.brandDates,
            $scope.object.brandRevenue,
            $scope.object.brand.name,
            document.getElementById("myChart1"),
            $scope.object.myChart1
          );
        });
      }
    });

    $scope.fetchOutletGraphData = function (outletId, outletName) {
      brandAdminDashBoardApi.fetchOutletGraphData(
        outletId,
        function (err, result) {
          console.log(err, result);
          if (result.data) {
            $scope.object.outletOrdersData = result.data[1];
            $scope.object.ordersAnalysis = brandAdminService.getOrderAnalysis(
              result.data[1]
            );

            console.log($scope.object.ordersAnalysis);

            if ($scope.object.myChart2) {
              $scope.object.myChart2.destroy();
            }

            $scope.object.activity = brandAdminService.getGraphData(
              $scope.object.month,
              result.data[0]
            );

            $scope.object.outletDates = $scope.object.activity.dates;
            $scope.object.outletRevenue = $scope.object.activity.activity;

            if ($scope.object.myChart2) {
              $scope.object.myChart2.destroy();
            }

            $scope.object.myChart2 = superAdminService.displayGraph(
              $scope.object.outletDates,
              $scope.object.outletRevenue,
              outletName,
              document.getElementById("myChart2"),
              $scope.object.myChart2
            );
          }
        }
      );
    };

    $scope.getBrandGraph = function (month) {
      $scope.object.month = month;
      brandAdminDashBoardApi.getGraphData(
        $scope.object.brand._id,
        month,
        $scope.object.currentYear,
        function (err, result) {
          if (result.data) {
            $scope.object.activity = brandAdminService.getGraphData(
              $scope.object.month,
              result.data[0]
            );

            $scope.object.brandDates = $scope.object.activity.dates;
            $scope.object.brandRevenue = $scope.object.activity.activity;
            $scope.object.activity = brandAdminService.getActivityData(
              $scope.object.month,
              result.data[1]
            );
            console.log($scope.object.activity);
            $scope.object.orderDates = $scope.object.activity.dates;
            $scope.object.orderCnts = $scope.object.activity.activity;

            if ($scope.object.myChart1) {
              $scope.object.myChart1.destroy();
            }

            $scope.object.myChart1 = superAdminService.displayGraph(
              $scope.object.brandDates,
              $scope.object.brandRevenue,
              $scope.object.brand.name,
              document.getElementById("myChart1"),
              $scope.object.myChart1
            );
          }
        }
      );
    };
    $scope.decreaseYear = function () {
      $scope.object.currentYear--;
    };
    $scope.increaseYear = function () {
      $scope.object.currentYear++;
    };
  },
]);
