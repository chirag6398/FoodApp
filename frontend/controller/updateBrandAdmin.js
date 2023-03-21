///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("updatebrandadminController", [
  "$scope",
  "$location",
  "adminApi",
  "$stateParams",
  function ($scope, $location, adminApi, $stateParams) {
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
        $location.path("login");
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
            alert("update successfully");
          }
        }
      );
    };
  },
]);
