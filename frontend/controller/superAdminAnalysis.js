///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminAnalysisController", [
  "$scope",
  "$http",
  "$location",
  "superAdminDashBoardApi",
  "$rootScope",
  function ($scope, $http, $location, superAdminDashBoardApi, $rootScope) {
    superAdminDashBoardApi.getBasicData(function (err, result) {
      if (result) {
        console.log(result);
        $scope.brandCnt = result.data[0][0].count;
        $scope.outletCnt = result.data[1][0].count;
        $scope.userCnt = result.data[2][0].count;
        $scope.brands = result.data[3];
        // console.log($scope.brandCnt);
      }
    });

    $scope.setOutletData = function (outlets) {
      console.log(outlets);
      $scope.outlets = outlets;
    };

    $scope.fechGraphData = function (brandId) {
      console.log(brandId);
      superAdminDashBoardApi.fetchBrandGraphData(
        brandId,
        function (err, result) {
          console.log(err, result);
          if (result.data.length) {
            $scope.brandDates = [0];
            $scope.brandRevenue = [0];
            result.data.forEach(function (element) {
              $scope.brandDates.push(element._id);
              $scope.brandRevenue.push(element.totalRevenue);
            });
            console.log($scope.brandDates, $scope.brandRevenue);
            var ctx1 = document.getElementById("myChart1").getContext("2d");
            var myChart1 = new Chart(ctx1, {
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
        }
      );
    };

    $scope.fetchOutletGraphData = function (outletId) {
      superAdminDashBoardApi.fetchOutletGraphData(
        outletId,
        function (err, result) {
          console.log(err, result);
          if (result.data.length) {
            $scope.outletDates = [0];
            $scope.outletRevenue = [0];
            result.data.forEach(function (element) {
              $scope.outletDates.push(element._id);
              $scope.outletRevenue.push(element.totalRevenue);
            });
            console.log($scope.outletDates, $scope.outletRevenue);
            var ctx2 = document.getElementById("myChart2").getContext("2d");
            var myChart2 = new Chart(ctx2, {
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
