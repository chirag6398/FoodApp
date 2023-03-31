///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminSettingController", [
  "$scope",
  "adminApi",
  "$stateParams",
  "$rootScope",
  "toastNotifications",
  function ($scope, adminApi, $stateParams, $rootScope, toastNotifications) {
    $scope.object = {
      admin: null,
      btnText1: "update",
      btnText2: "change",
      isLoading: true,
    };
    adminApi.getAdminPage();
    $rootScope.$on("passData", function (err, data) {
      $scope.object.admin = data;
      $scope.object.isLoading = false;
    });

    $scope.updateAdmin = function ($event, adminId) {
      $event.preventDefault();
      $scope.object.btnText1 = "processing";
      adminApi.updateAdmin(
        $scope.object.admin,
        $stateParams.id,
        function (err, result) {
          console.log(result);
          if (result) {
            $scope.object.btnText1 = "successfull";
            toastNotifications.success("updated successfully");
          } else {
            $scope.object.btnText1 = "Retry";
            toastNotifications.error("updation failed");
          }
        }
      );
    };
    $scope.changePassword = function ($event) {
      $event.preventDefault();
      $scope.object.btnText2 = "changing";
      adminApi.updatePassword(
        $scope.object.admin,
        $stateParams.id,
        function (err, result) {
          console.log(result);
          if (result) {
            $scope.object.btnText2 = "changed";
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error("please try later");
          }
        }
      );
    };
  },
]);
