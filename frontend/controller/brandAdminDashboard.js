///<reference path="../module/module.js"/>

app.controller("brandAdminDashboardController", [
  "$scope",
  "$http",
  "$location",
  "apiHandler",
  "brandAdminDashBoardApi",
  function ($scope, $http, $location, apiHandler, brandAdminDashBoardApi) {
    apiHandler.getBrandAdminPage(function (result) {
      console.log(result);
      if (result) {
        $scope.brandId = result.data._id;

        brandAdminDashBoardApi.getBasicData(
          $scope.brandId,
          function (err, result) {
            console.log(err, result);
          }
        );
      } else {
        $location.path("login");
      }
    });
  },
]);
