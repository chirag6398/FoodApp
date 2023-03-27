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
      topSecondBrandName: null,
      topBrandOutletCnt: 0,
      topBrandEmployeeCnt: 0,
      topSecondBrandName: null,
      topSecondBrandOutletCnt: 0,
      topSecondBrandEmployeeCnt: 0,
      revenue: [0],
      topSecondBrandDates: [0],
      topSecondBrandRevenue: [0],
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
      chart4: null,
      chart5: null,
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
      outletsRanking: null,
    };

    superAdminService.displayMap();

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
        $scope.object.topBrandOutletCnt = result.data[9];
        $scope.object.topBrandEmployeeCnt = result.data[10];
        $scope.object.topSecondBrandOutletCnt = result.data[12];
        $scope.object.topSecondBrandEmployeeCnt = result.data[13];

        $scope.object.outletsRanking = superAdminService.outletRanking(
          result.data[6]
        );
        $scope.object.userPerBrand = superAdminService.userPerBrand(
          result.data[7]
        );

        if ($scope.object.chart4) {
          $scope.object.chart4.destroy();
        }

        $scope.object.chart4 = superAdminService.displayTypeGraph(
          $scope.object.outletsRanking.names,
          $scope.object.outletsRanking.revenue,
          "doughnut",
          "rankings",
          document.getElementById("myChart4").getContext("2d"),
          $scope.object.chart4
        );

        $scope.object.chart5 = superAdminService.displayTypeGraph(
          $scope.object.userPerBrand.names,
          $scope.object.userPerBrand.cnts,
          "pie",
          "UserPerBrand",
          document.getElementById("myChart5").getContext("2d"),
          $scope.object.chart5
        );

        $scope.object.graphData = superAdminService.createGraphData(
          result.data[8]
        );

        $scope.object.dates = $scope.object.graphData.dates;
        $scope.object.revenue = $scope.object.graphData.revenue;
        $scope.object.topBrandName = result.data[8][0].name;

        $scope.object.graphData = superAdminService.createGraphData(
          result.data[11]
        );

        $scope.object.topSecondBrandDates = $scope.object.graphData.dates;
        $scope.object.topSecondBrandRevenue = $scope.object.graphData.revenue;
        $scope.object.topSecondBrandName = result.data[11][0].name;

        $scope.object.chart1 = superAdminService.compareGraph(
          $scope.object.dates,
          $scope.object.revenue,
          $scope.object.topBrandName,
          $scope.object.topSecondBrandDates,
          $scope.object.topSecondBrandRevenue,
          $scope.object.topSecondBrandName,
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

      $scope.object.isLoading = true;
      superAdminDashBoardApi.fetchBrandGraphData(
        brandId,
        function (err, result) {
          $scope.object.isLoading = false;
          console.log(err, result);
          if (result.data) {
            $scope.object.graphData = superAdminService.createGraphData(
              result.data
            );
            if ($scope.object.chart2) {
              $scope.object.chart2.destroy();
            }

            $scope.object.brandDates = $scope.object.graphData.dates;
            $scope.object.brandRevenue = $scope.object.graphData.revenue;

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
      $scope.object.isLoading = true;

      superAdminDashBoardApi.fetchOutletGraphData(
        outletId,
        function (err, result) {
          $scope.object.isLoading = false;
          if (result.data) {
            $scope.object.graphData = superAdminService.createGraphData(
              result.data
            );

            $scope.object.outletDates = $scope.object.graphData.dates;
            $scope.object.outletRevenue = $scope.object.graphData.revenue;

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

    $scope.getDataOfTopTwoBrands = function (month) {
      $scope.object.isLoading = true;
      superAdminDashBoardApi.getDataOfTopTwoBrands(
        month,
        function (err, result) {
          console.log(err, result);
          $scope.object.isLoading = false;
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

            if ($scope.object.chart1) {
              $scope.object.chart1.destroy();
            }
            $scope.object.chart1 = superAdminService.compareGraph(
              $scope.object.dates,
              $scope.object.revenue,
              $scope.object.topBrandName,
              $scope.object.topSecondBrandDates,
              $scope.object.topSecondBrandRevenue,
              $scope.object.topSecondBrandName,
              document.getElementById("myChart3").getContext("2d"),
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

            if ($scope.object.chart1) {
              $scope.object.chart1.destroy();
            }
            $scope.object.chart1 = superAdminService.compareGraph(
              $scope.object.dates,
              $scope.object.revenue,
              $scope.object.topBrandName,
              $scope.object.topSecondBrandDates,
              $scope.object.topSecondBrandRevenue,
              $scope.object.topSecondBrandName,
              document.getElementById("myChart3").getContext("2d"),
              $scope.object.chart1
            );
          }
        }
      );
    };
  },
]);
