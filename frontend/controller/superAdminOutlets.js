///<reference path="../module/module.js"/>

app.controller("superAdminOutletsController", [
  "$scope",
  "adminApi",
  "$rootScope",
  function ($scope, adminApi, $rootScope) {
    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      $scope.btnText = "Create";
      $scope.admin = data;
      console.log($scope.admin);
      $scope.superAdminId = data._id;
    });

    adminApi.getOutlets(function (err, result) {
      console.log(result, err);
      if (result) {
        $scope.outlets = result.data;
      }
    });
  },
]);
