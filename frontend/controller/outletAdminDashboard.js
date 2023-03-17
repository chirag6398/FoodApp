///<reference path="../module/module.js"/>

app.controller("outletAdminDashboardController", [
  "$scope",
  "$location",
  "outletAdminDashBoardApi",
  "$rootScope",
  "outletApi",
  function ($scope, $location, outletAdminDashBoardApi, $rootScope, outletApi) {
    outletApi.getOutletAdminPage();
    var myChart1 = null;
    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      if (data) {
        $rootScope.outletId = data.data.outletData._id;
        outletAdminDashBoardApi.getBasicData(
          $rootScope.outletId,
          function (err, result) {
            console.log(result);
            $scope.totalProduct = result.data[0][0].productCount;
            $scope.totalEmployees = result.data[1][0].employeeCount;
            $scope.totalRevenue = result.data[2][0].totalRevenue;
            $scope.topTenCategories = result.data[3];
            $scope.topTenProducts = result.data[4];
            $scope.outletDates = [0];
            $scope.outletRevenue = [0];
            result.data[5].forEach(function (element) {
              $scope.outletDates.push(element._id);
              $scope.outletRevenue.push(element.totalRevenue);
            });
            if (myChart1) {
              myChart1.destroy();
            }
            console.log($scope.outletDates, $scope.outletRevenue);
            var ctx2 = document.getElementById("myChart").getContext("2d");
            myChart1 = new Chart(ctx2, {
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
