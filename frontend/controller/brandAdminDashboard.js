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
    $scope.object = {
      myChart1: null,
      myChart2: null,
      brand: null,
      outlets: null,
      totalOutlets: null,
      totalEmployees: null,
      totalRevenue: null,
      topTenCategories: null,
      topTenProducts: null,
      brandGraphData: null,
      brandDates: [0],
      brandRevenue: [0],
      outletDates: [0],
      outletRevenue: [0],
      isLoading: true,
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
    };
    $timeout(function () {
      if ($scope.object.brand === null) {
        brandApi.getBrandAdminPage();
      }
    }, 1300);

    $rootScope.$on("passData", function (err, result) {
      if (result) {
        console.log(result);
        $scope.object.brand = result.data.data;
        $scope.object.isLoading = false;
        brandAdminDashBoardApi.getBasicData(
          $scope.object.brand._id,
          function (err, result) {
            console.log(err, result);
            $scope.object.outlets = result.data[0][0].names;
            $scope.object.totalOutlets = result.data[1][0].count;
            $scope.object.totalEmployees = result.data[1][0].count;
            $scope.object.totalRevenue = result.data[2][0].totalRevenue;
            $scope.object.topTenCategories = result.data[3];
            $scope.object.topTenProducts = result.data[4];
            $scope.object.brandGraphData = result.data[5];
            $scope.object.topOutlet = result.data[7][0];
            $scope.object.bottomOutlet = result.data[6][0];

            $scope.object.month = new Date().getMonth();
            $scope.object.activity = brandAdminService.getGraphData(
              $scope.object.month,
              $scope.object.brandGraphData
            );

            $scope.object.brandDates = $scope.object.activity.dates;
            $scope.object.brandRevenue = $scope.object.activity.activity;

            if ($scope.object.myChart1) {
              $scope.object.myChart1.destroy();
            }

            $scope.object.myChart1 = superAdminService.displayGraph(
              $scope.object.brandDates,
              $scope.object.brandRevenue,
              $scope.object.brand.name,
              document.getElementById("myChart1").getContext("2d"),
              $scope.object.myChart1
            );
          }
        );
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
              document.getElementById("myChart2").getContext("2d"),
              $scope.object.myChart2
            );
          }
        }
      );
    };
  },
]);
