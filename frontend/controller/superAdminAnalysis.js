///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminAnalysisController", [
  "$scope",
  "superAdminDashBoardApi",
  "superAdminService",
  "$rootScope",
  function ($scope, superAdminDashBoardApi, superAdminService, $rootScope) {
    $scope.object = {
      dates: [0],
      topBrandName: null,
      revenue: [0],
      brandCnt: 0,
      outletCnt: 0,
      userCnt: 0,
      brands: null,
      totalRevenue: 0,
      topBrands: null,
      outlets: null,
      brandDates: [0],
      brandRevenue: [0],
      outletDates: [0],
      outletRevenue: [0],
      chart1: null,
      chart2: null,
      chart3: null,
      isLoading: true,
    };

    superAdminDashBoardApi.getBasicData(function (err, result) {
      if (result && result.data) {
        console.log(result);
        $scope.object.isLoading = false;
        $scope.object.brandCnt = result.data[0][0].count;
        $scope.object.outletCnt = result.data[1][0].count;
        $scope.object.userCnt = result.data[2][0].count;
        $scope.object.brands = result.data[3];
        $scope.object.totalRevenue = result.data[5][0].lastMonthRevenue;
        $scope.object.topBrands = result.data[4];

        result.data[6].forEach(function (value) {
          $scope.object.dates.push(value._id);
          $scope.object.revenue.push(value.totalRevenue);
          $scope.object.topBrandName = value.name;
        });

        $scope.object.chart1 = superAdminService.displayGraph(
          $scope.object.dates,
          $scope.object.revenue,
          $scope.object.topBrandName,
          document.getElementById("myChart3").getContext("2d"),
          $scope.object.chart1
        );
      }
    });

    $scope.setOutletData = function (outlets) {
      console.log(outlets);
      $scope.object.outlets = outlets;
    };

    $scope.fechGraphData = function (brandId, brandName) {
      console.log(brandId);
      superAdminDashBoardApi.fetchBrandGraphData(
        brandId,
        function (err, result) {
          console.log(err, result);
          if (result.data.length) {
            result.data.forEach(function (element) {
              $scope.object.brandDates.push(element._id);
              $scope.object.brandRevenue.push(element.totalRevenue);
            });

            if ($scope.object.chart2) {
              $scope.object.chart2.destroy();
            }

            $scope.object.chart2 = superAdminService.displayGraph(
              $scope.object.brandDates,
              $scope.object.brandRevenue,
              brandName,
              document.getElementById("myChart1").getContext("2d"),
              $scope.object.chart2
            );
          }
        }
      );
    };

    $scope.fetchOutletGraphData = function (outletId, outletName) {
      superAdminDashBoardApi.fetchOutletGraphData(
        outletId,
        function (err, result) {
          if (result.data.length) {
            result.data.forEach(function (element) {
              $scope.object.outletDates.push(element._id);
              $scope.object.outletRevenue.push(element.totalRevenue);
            });

            if ($scope.object.chart3) {
              $scope.object.chart3.destroy();
            }

            $scope.object.chart3 = superAdminService.displayGraph(
              $scope.object.outletDates,
              $scope.object.outletRevenue,
              outletName,
              document.getElementById("myChart2").getContext("2d"),
              $scope.object.chart3
            );
          }
        }
      );
    };
  },
]);
