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
            $scope.brandDates = [];
            $scope.brandRevenue = [];
            result.data.forEach(function (element) {
              $scope.brandDates.push(element._id);
              $scope.brandRevenue.push(element.totalRevenue);
            });
            console.log($scope.brandDates, $scope.brandRevenue);
          }
        }
      );
    };
  },
]);
