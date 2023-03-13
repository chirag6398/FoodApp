///<reference path="../module/module.js"/>

app.controller("superAdminSuperCategoriesController", [
  "$scope",
  "adminApi",
  "$rootScope",
  function ($scope, adminApi, $rootScope) {
    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      $scope.btnText = "Create";
      $scope.admin = data.user;
      console.log($scope.admin);
      $scope.superAdminId = data._id;
    });

    adminApi.getSuperCategories(function (err, result) {
      console.log(result, err);
      if (result) {
        $scope.superCategories = result.data;
      }
    });
  },
]);
