///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("loginController", [
  "$scope",
  "$state",
  "$location",
  "apiHandler",
  "toastNotifications",
  function ($scope, $state, $location, apiHandler, toastNotifications) {
    $scope.object = {
      disabledFlag: false,
      buttonText: "submit",
      lgn: {},
    };
    $scope.submitHandler = function ($event) {
      $event.preventDefault();
      $scope.object.disabledFlag = true;
      $scope.object.buttonText = "processing";

      apiHandler.postLogin($scope.object.lgn, function (err, result) {
        if (err) {
          $scope.object.buttonText = "Retry";
          $scope.object.disabledFlag = false;
          toastNotifications.error("Login Failed");
        } else {
          $scope.object.buttonText = "successfull";
          toastNotifications.success("login successfull");
          window.localStorage.setItem(
            "Authorization",
            "Bearer " + result.token
          );
          if (result.userType === "superAdmin") {
            $state.go("superAdmin.analysis");
          } else if (result.userType === "brandAdmin") {
            $state.go("brandadmin.dashboard");
          } else if (result.userType === "outletAdmin") {
            $state.go("outletAdmin.outletAdminDashboard");
          } else if (result.userType === "outletAgent") {
            $location.path("outletAgent");
          }
        }
      });
    };
  },
]);
