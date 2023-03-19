///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminUsersController", [
  "$scope",
  "$rootScope",
  "brandApi",
  function ($scope, $rootScope, brandApi) {
    $scope.object = {
      brand: null,
      users: null,
    };
    brandApi.getBrandAdminPage();
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.object.brand = result.data.data;

        brandApi.getBrandUsers($scope.object.brand._id, function (err, result) {
          if (result) {
            console.log(result);
            $scope.object.users = result.data;
          }
        });
      }
    });
  },
]);
