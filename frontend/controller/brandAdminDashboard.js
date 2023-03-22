///<reference path="../module/module.js"/>

app.controller("brandAdminDashboardController", [
  "$scope",
  "$rootScope",
  "brandApi",
  "brandAdminDashBoardApi",
  "$timeout",
  function ($scope, $rootScope, brandApi, brandAdminDashBoardApi, $timeout) {
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

            $scope.object.brandGraphData.forEach(function (element) {
              $scope.object.brandDates.push(element._id);
              $scope.object.brandRevenue.push(element.totalRevenue);
            });
            if ($scope.object.myChart1) {
              $scope.object.myChart1.destroy();
            }

            var ctx1 = document.getElementById("myChart1").getContext("2d");
            $scope.object.myChart1 = new Chart(ctx1, {
              type: "line",
              data: {
                labels: $scope.object.brandDates,
                datasets: [
                  {
                    data: $scope.object.brandRevenue,
                    label: "Dataset",
                    fill: true,
                    backgroundColor: "rgba(220,220,220,0.5)",
                    borderColor: "rgba(220,220,220,1)",
                    pointBackgroundColor: "rgba(220,220,220,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                  },
                ],
              },
            });
          }
        );
      }
    });

    $scope.fetchOutletGraphData = function (outletId) {
      brandAdminDashBoardApi.fetchOutletGraphData(
        outletId,
        function (err, result) {
          console.log(err, result);
          if (result.data) {
            if ($scope.object.myChart2) {
              $scope.object.myChart2.destroy();
            }

            result.data.forEach(function (element) {
              $scope.object.outletDates.push(element._id);
              $scope.object.outletRevenue.push(element.totalRevenue);
            });

            var ctx2 = document.getElementById("myChart2").getContext("2d");
            $scope.object.myChart2 = new Chart(ctx2, {
              type: "line",
              data: {
                labels: $scope.object.outletDates,
                datasets: [
                  {
                    data: $scope.object.outletRevenue,
                    label: "Dataset",
                    fill: true,
                    backgroundColor: "rgba(220,220,220,0.5)",
                    borderColor: "rgba(220,220,220,1)",
                    pointBackgroundColor: "rgba(220,220,220,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                  },
                ],
              },
            });
          }
        }
      );
    };
  },
]);
