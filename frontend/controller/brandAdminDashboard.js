///<reference path="../module/module.js"/>

app.controller("brandAdminDashboardController", [
  "$scope",
  "$rootScope",
  "brandApi",
  "brandAdminDashBoardApi",
  function ($scope, $rootScope, brandApi, brandAdminDashBoardApi) {
    brandApi.getBrandAdminPage();
    var myChart1 = null;

    $rootScope.$on("passData", function (err, result) {
      if (result) {
        console.log(result);
        $scope.brandId = result.data.data._id;
        brandAdminDashBoardApi.getBasicData(
          $scope.brandId,
          function (err, result) {
            console.log(err, result);
            $scope.outlets = result.data[0][0].names;
            $scope.totalOutlets = result.data[1][0].count;
            $scope.totalEmployees = result.data[1][0].count;
            $scope.totalRevenue = result.data[2][0].totalRevenue;
            $scope.topTenCategories = result.data[3];
            $scope.topTenProducts = result.data[4];
            $scope.brandGraphData = result.data[5];

            $scope.brandDates = [0];
            $scope.brandRevenue = [0];
            $scope.brandGraphData.forEach(function (element) {
              $scope.brandDates.push(element._id);
              $scope.brandRevenue.push(element.totalRevenue);
            });
            if (myChart1) {
              myChart1.destroy();
            }
            console.log($scope.brandDates, $scope.brandRevenue);
            var ctx1 = document.getElementById("myChart1").getContext("2d");
            myChart1 = new Chart(ctx1, {
              type: "line",
              data: {
                labels: $scope.brandDates,
                datasets: [
                  {
                    data: $scope.brandRevenue,
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

    var myChart2 = null;

    $scope.fetchOutletGraphData = function (outletId) {
      brandAdminDashBoardApi.fetchOutletGraphData(
        outletId,
        function (err, result) {
          console.log(err, result);
          if (result.data) {
            if (myChart2) {
              myChart2.destroy();
            }
            $scope.outletDates = [0];
            $scope.outletRevenue = [0];
            result.data.forEach(function (element) {
              $scope.outletDates.push(element._id);
              $scope.outletRevenue.push(element.totalRevenue);
            });
            console.log($scope.outletDates, $scope.outletRevenue);
            var ctx2 = document.getElementById("myChart2").getContext("2d");
            myChart2 = new Chart(ctx2, {
              type: "line",
              data: {
                labels: $scope.outletDates,
                datasets: [
                  {
                    data: $scope.outletRevenue,
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
