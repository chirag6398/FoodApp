///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminUsersController", [
  "$scope",
  "$rootScope",
  "brandApi",
  function ($scope, $rootScope, brandApi) {
    brandApi.getBrandAdminPage();
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.brandName = result.data.data.name;
        $scope.brandId = result.data.data._id;
        brandApi.getBrandUsers($scope.brandId, function (err, result) {
          if (result) {
            console.log(result);
            $scope.users = result.data;
          }
        });
      }
    });
  },
]);
