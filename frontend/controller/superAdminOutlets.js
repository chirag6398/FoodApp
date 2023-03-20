///<reference path="../module/module.js"/>

app.controller("superAdminOutletsController", [
  "$scope",
  "adminApi",
  "$rootScope",
  function ($scope, adminApi, $rootScope) {
    $scope.object = {
      outlets: null,
    };

    adminApi.getOutlets(function (err, result) {
      console.log(result, err);
      if (result) {
        $scope.object.outlets = result.data;
      }
    });
  },
]);
