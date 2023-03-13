///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminSettingController", [
  "$scope",
  "adminApi",
  "$stateParams",
  "$rootScope",
  function ($scope, adminApi, $stateParams, $rootScope) {
    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      $scope.btnText = "Create";
      $scope.admin = data;
      console.log($scope.admin);
      $scope.superAdminId = data._id;
    });

    $scope.btnText1 = "update";
    $scope.updateAdmin = function ($event, adminId) {
      $event.preventDefault();
      adminApi.updateAdmin($scope.admin, adminId, function (err, result) {
        console.log(result);
        if (result) $scope.btnText1 = "updated successfully";
      });
    };
    $scope.changePassword = function ($event, adminId) {
      $event.preventDefault();
      adminApi.updatePassword($scope.admin, adminId, function (err, result) {
        console.log(result);
        $scope.btnText1 = "updated successfully";
      });
    };
    $scope.adminId = $stateParams.id;
  },
]);
