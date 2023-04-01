///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminAnalysisController", [
  "$scope",
  "superAdminDashBoardApi",
  "superAdminService",
  "$rootScope",
  function ($scope, superAdminDashBoardApi, superAdminService, $rootScope) {
    superAdminService.displayMap();
    $scope.isLoading = true;
    superAdminService.getBasicData(function (err, result) {
      $scope.isLoading = false;
      if (result) {
        console.log(result);
        $scope.object = result;

        // if ($scope.object.chart4) {
        //   $scope.object.chart4.destroy();
        // }

        $scope.object.chart4 = superAdminService.displayTypeGraph(
          $scope.object.outletsRanking.names,
          $scope.object.outletsRanking.revenue,
          "doughnut",
          "rankings",
          document.getElementById("myChart4"),
          $scope.object.chart4
        );

        $scope.object.chart5 = superAdminService.displayTypeGraph(
          $scope.object.userPerBrand.names,
          $scope.object.userPerBrand.cnts,
          "pie",
          "UserPerBrand",
          document.getElementById("myChart5"),
          $scope.object.chart5
        );

        $scope.object.chart1 = superAdminService.compareGraph(
          $scope.object.dates,
          $scope.object.revenue,
          $scope.object.topBrandName,
          $scope.object.topSecondBrandDates,
          $scope.object.topSecondBrandRevenue,
          $scope.object.topSecondBrandName,
          document.getElementById("myChart3"),
          $scope.object.chart1
        );
      }
    });

    $scope.searchTextHandler = function () {
      superAdminService.searchDashboardBrandDebouncing(
        $scope.object.searchBrand,
        function (err, result) {
          console.log(err, result);

          if (result) {
            $scope.object.searchTextResult = result.data;
          } else {
            $scope.object.searchTextResult = [];
          }
        }
      );
    };

    $scope.setSearchResult = function (res) {
      $scope.object.brands = [res];
      $scope.object.selectedBrand = res;
      $scope.object.searchTextResult = [];
    };

    $scope.setOutletData = function (outlets) {
      console.log(outlets);
      $scope.object.outlets = outlets;
    };

    $scope.fechGraphData = function (brandId, brandName) {
      console.log(brandId);

      $scope.isLoading = true;
      superAdminDashBoardApi.fetchBrandGraphData(
        brandId,
        function (err, result) {
          $scope.isLoading = false;
          console.log(err, result);
          if (result.data) {
            $scope.object.graphData = superAdminService.createGraphData(
              result.data
            );
            // if ($scope.object.chart2) {
            //   $scope.object.chart2.destroy();
            // }

            $scope.object.brandDates = $scope.object.graphData.dates;
            $scope.object.brandRevenue = $scope.object.graphData.revenue;

            $scope.object.chart2 = superAdminService.displayGraph(
              $scope.object.brandDates,
              $scope.object.brandRevenue,
              brandName,
              document.getElementById("myChart1"),
              $scope.object.chart2
            );
          }
        }
      );
    };

    $scope.fetchOutletGraphData = function (outletId, outletName) {
      $scope.isLoading = true;

      superAdminDashBoardApi.fetchOutletGraphData(
        outletId,
        function (err, result) {
          $scope.isLoading = false;
          if (result.data) {
            $scope.object.graphData = superAdminService.createGraphData(
              result.data
            );

            $scope.object.outletDates = $scope.object.graphData.dates;
            $scope.object.outletRevenue = $scope.object.graphData.revenue;

            // if ($scope.object.chart3) {
            //   $scope.object.chart3.destroy();
            // }

            $scope.object.chart3 = superAdminService.displayGraph(
              $scope.object.outletDates,
              $scope.object.outletRevenue,
              outletName,
              document.getElementById("myChart2"),
              $scope.object.chart3
            );
          }
        }
      );
    };

    $scope.getDataOfTopTwoBrands = function (month) {
      $scope.isLoading = true;
      superAdminDashBoardApi.getDataOfTopTwoBrands(
        month,
        $scope.object.currentYear,
        function (err, result) {
          console.log(err, result);
          $scope.isLoading = false;
          if (result.data.length) {
            $scope.object.graphData = superAdminService.createGraphData(
              result.data[0]
            );

            $scope.object.dates = $scope.object.graphData.dates;
            $scope.object.revenue = $scope.object.graphData.revenue;
            $scope.object.topBrandName = result.data[0][0].name;
            if (result.data.length >= 3)
              $scope.object.graphData = superAdminService.createGraphData(
                result.data[3]
              );

            $scope.object.topSecondBrandDates = $scope.object.graphData.dates;
            $scope.object.topSecondBrandRevenue =
              $scope.object.graphData.revenue;
            $scope.object.topSecondBrandName = result.data[3][0].name;

            // if ($scope.object.chart1) {
            //   $scope.object.chart1.destroy();
            // }
            $scope.object.chart1 = superAdminService.compareGraph(
              $scope.object.dates,
              $scope.object.revenue,
              $scope.object.topBrandName,
              $scope.object.topSecondBrandDates,
              $scope.object.topSecondBrandRevenue,
              $scope.object.topSecondBrandName,
              document.getElementById("myChart3"),
              $scope.object.chart1
            );
          } else {
            $scope.object.graphData = superAdminService.createGraphData([]);

            $scope.object.dates = $scope.object.graphData.dates;
            $scope.object.revenue = $scope.object.graphData.revenue;
            $scope.object.topBrandName = "None";

            $scope.object.graphData = superAdminService.createGraphData([]);

            $scope.object.topSecondBrandDates = $scope.object.graphData.dates;
            $scope.object.topSecondBrandRevenue =
              $scope.object.graphData.revenue;
            $scope.object.topSecondBrandName = "None";

            // if ($scope.object.chart1) {
            //   $scope.object.chart1.destroy();
            // }
            $scope.object.chart1 = superAdminService.compareGraph(
              $scope.object.dates,
              $scope.object.revenue,
              $scope.object.topBrandName,
              $scope.object.topSecondBrandDates,
              $scope.object.topSecondBrandRevenue,
              $scope.object.topSecondBrandName,
              document.getElementById("myChart3"),
              $scope.object.chart1
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
