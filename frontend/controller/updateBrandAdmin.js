///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("updatebrandadminController", [
  "$scope",
  "$state",
  "adminApi",
  "$stateParams",
  "toastNotifications",
  function ($scope, $state, adminApi, $stateParams, toastNotifications) {
    $scope.object = {
      admin: null,
      btnText: "update",
    };

    adminApi.getUserById($stateParams.id, function (err, result) {
      if (result) {
        $scope.object.admin = {
          userName: result.data.userName,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          number: result.data.number,
        };
      } else {
        toastNotifications.error("unable to fetch data please try later");
      }
    });

    $scope.updateBrandAdmin = function ($event) {
      $event.preventDefault();
      $scope.object.btnText = "processing";
      console.log($scope.object.admin);
      adminApi.updateAdmin(
        $scope.object.admin,
        $stateParams.id,
        function (err, result) {
          if (result) {
            $scope.object.btnText = "updated";
            toastNotifications.success("update successfully");
            $state.go("superAdmin.createBrand");
          }
        }
      );
    };
  },
]);
