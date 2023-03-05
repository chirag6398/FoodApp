///<reference path="../module/module.js"/>

app.controller("superAdminBrandDataController", [
  "$scope",
  "$http",
  "$location",
  "adminApi",
  "apiHandler",
  "$stateParams",
  "$rootScope",
  function (
    $scope,
    $http,
    $location,
    adminApi,
    apiHandler,
    $stateParams,
    $rootScope
  ) {
    adminApi.getBrand($stateParams.id, function (err, result) {
      if (result) {
        $scope.brand = result;
        // console.log(result);
      } else {
        $location.path("superAdmin");
      }
    });
  },
]);
