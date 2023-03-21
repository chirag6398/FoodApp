///<reference path="../module/module.js"/>

app.controller("outletAdminDashboardController", [
  "$scope",
  "$location",
  "outletAdminDashBoardApi",
  "$rootScope",
  "outletApi",
  "$timeout",
  function (
    $scope,
    $location,
    outletAdminDashBoardApi,
    $rootScope,
    outletApi,
    $timeout
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
    };

    $timeout(function () {
      if ($scope.object.outlet === null) {
        outletApi.getOutletAdminPage();
      }
    }, 1300);

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
            result.data[5].forEach(function (element) {
              $scope.object.outletDates.push(element._id);
              $scope.object.outletRevenue.push(element.totalRevenue);
            });
            if ($scope.object.myChart1) {
              $scope.object.myChart1.destroy();
            }
            console.log($scope.object.outletDates, $scope.object.outletRevenue);
            var ctx2 = document.getElementById("myChart").getContext("2d");
            $scope.object.myChart1 = new Chart(ctx2, {
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
        );
      }
    });

    $rootScope.$on("notEligible", function (err, isEligible) {
      if (!isEligible) {
        $location.path("login");
      }
    });
  },
]);
