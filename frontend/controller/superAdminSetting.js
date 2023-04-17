///<reference path="../module/module.js"/>

app.controller("superAdminSettingController", [
  "$scope",
  "adminApi",
  "$stateParams",
  "$rootScope",
  "toastNotifications",
  function ($scope, adminApi, $stateParams, $rootScope, toastNotifications) {
    $scope.object = {
      admin: null,
      isLoading: true,
      updateAdmin: null,
    };
    adminApi.getAdminPage();
    $rootScope.$on("passData", function (err, data) {
      $scope.object.admin = data;
      $scope.object.isLoading = false;
    });

    $scope.setFormData = function (admin) {
      $scope.object.updateAdmin = { ...admin };
    };

    // $scope.updateAdmin = function () {

    //   adminApi.updateAdmin(
    //     $scope.object.admin,
    //     $stateParams.id,
    //     function (err, result) {
    //       console.log(result);
    //       if (result) {
    //         toastNotifications.success("updated successfully");
    //       } else {
    //         toastNotifications.error("updation failed");
    //       }
    //     }
    //   );
    // };

    $scope.updateUserName = function () {
      adminApi.updateUserName(
        $scope.object.updateAdmin.userName,
        $stateParams.id,
        function (err, result) {
          if (result) {
            $scope.object.admin.userName = $scope.object.updateAdmin.userName;
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error(err.message);
          }
          $("#exampleModal1").modal("hide");
        }
      );
    };

    $scope.updateEmail = function () {
      adminApi.updateEmail(
        $scope.object.updateAdmin.email,
        $stateParams.id,
        function (err, result) {
          if (result) {
            $scope.object.admin.email = $scope.object.updateAdmin.email;
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error(err.message);
          }
          $("#exampleModal2").modal("hide");
        }
      );
    };

    $scope.updatePhoneNumber = function () {
      adminApi.updatePhoneNumber(
        $scope.object.updateAdmin.number,
        $stateParams.id,
        function (err, result) {
          if (result) {
            $scope.object.admin.number = $scope.object.updateAdmin.number;
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error(err.message);
          }
          $("#exampleModal3").modal("hide");
        }
      );
    };

    $scope.changePassword = function () {
      adminApi.updatePassword(
        $scope.object.updateAdmin,
        $stateParams.id,
        function (err, result) {
          console.log(result);
          if (result) {
            toastNotifications.success("Password Changed");
          } else {
            toastNotifications.error("please try later");
          }
          $("#exampleModal4").modal("hide");
        }
      );
    };
  },
]);
