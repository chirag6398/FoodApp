///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandSettingController", [
  "$scope",
  "$stateParams",
  "apiHandler",
  "brandApi",
  function ($scope, $stateParams, apiHandler, brandApi) {
    brandApi.getAdmin($stateParams.id, function (err, result) {
      console.log(err, result);
      if (result) {
        $scope.brandAdmin = result.data;
      }
    });

    $scope.updateAdmin = function ($event, id) {
      $event.preventDefault();
      apiHandler.updateAdmin($scope.brandAdmin, id, function (err, result) {
        if (result) {
          console.log(result);
        }
      });
    };
    $scope.changePassword = function ($event, id) {
      $event.preventDefault();
      apiHandler.updatePassword($scope.admin, id, function (err, result) {
        console.log(result);
        if (result) {
          console.log(result);
        }
      });
    };
  },
]);
