///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("updatebrandadminController", [
  "$scope",
  "$location",
  "adminApi",
  "$stateParams",
  function ($scope, $location, adminApi, $stateParams) {
    console.log($stateParams.id); //user id

    adminApi.getUserById($stateParams.id, function (err, result) {
      console.log(result);
      $scope.btnText = "update";
      if (result) {
        $scope.admin = {
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
      $scope.btnText = "processing";
      console.log($scope.admin);
      adminApi.updateAdmin(
        $scope.admin,
        $stateParams.id,
        function (err, result) {
          if (result) {
            $scope.btnText = "updated";
            alert("update successfully");
          }
        }
      );
    };
  },
]);
