///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminUsersController", [
  "$scope",
  "adminApi",
  "$rootScope",
  function ($scope, adminApi, $rootScope) {
    $scope.isAccess = false;
    $rootScope.$on("passData", function (event, data) {
      $scope.isAccess = true;
    });

    adminApi.getUsers(function (err, result) {
      if (result) {
        console.log(result);
        $scope.users = result.data;
      }
    });
  },
]);
