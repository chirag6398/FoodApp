///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandSettingController", [
  "$scope",
  "$stateParams",
  "$stateParams",
  "brandApi",
  function ($scope, $stateParams, $stateParams, brandApi) {
    brandApi.getAdmin($stateParams.id, function (err, result) {
      console.log(err, result);
      if (result) {
        $scope.brandAdmin = result.data;
      }
    });

    $scope.updateAdmin = function ($event, id) {
      $event.preventDefault();
      brandApi.updateAdmin($scope.brandAdmin, id, function (err, result) {
        if (result) {
          console.log(result);
        }
      });
    };
    $scope.changePassword = function ($event) {
      $event.preventDefault();
      brandApi.updatePassword(
        $scope.brandAdmin.password,
        $stateParams.id,
        function (err, result) {
          console.log(err, result);
        }
      );
    };
  },
]);
