///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("loginController", [
  "$scope",
  "$state",
  "$location",
  "apiHandler",
  "$rootScope",
  function ($scope, $state, $location, apiHandler, $rootScope) {
    $scope.disabledFlag = false;
    $scope.buttonText = "submit";
    $scope.isSuccess = false;
    $scope.submitHandler = function ($event) {
      $event.preventDefault();
      $scope.disabledFlag = true;
      $scope.buttonText = "processing";

      apiHandler.postLogin($scope.lgn, function (err, result) {
        if (err) {
          $scope.buttonText = "Retry";
          $scope.disabledFlag = false;
        } else {
          $scope.buttonText = "successfull";
          window.localStorage.setItem(
            "Authorization",
            "Bearer " + result.token
          );
          $scope.isSuccess = true;
          if (result.userType === "superAdmin") {
            $rootScope.admin = result.admin;
            $state.go("superAdmin.analysis");
          } else if (result.userType === "brandAdmin") {
            $state.go("brandadmin.dashboard");
          } else if (result.userType === "outletAdmin") {
            $rootScope.admin = result.admin;
            $location.path("outletAdmin");
          } else if (result.userType === "outletAgent") {
            $rootScope.admin = result.admin;
            $location.path("outletAgent");
          }
        }
      });
    };
  },
]);
