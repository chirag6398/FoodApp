///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("updateOutletAdminController", [
  "$scope",
  "$location",
  "apiHandler",
  "$stateParams",
  function ($scope, $location, apiHandler, $stateParams) {
    $scope.object = {
      btnText: "update",
      admin: null,
    };
    console.log($stateParams.id);

    apiHandler.getUserById($stateParams.id, function (response) {
      if (response.status == 200) {
        $scope.object.admin = {
          userName: response.data.userName,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          number: response.data.number,
        };
      } else {
        $location.path("login");
      }
    });

    $scope.updateAdmin = function ($event) {
      $event.preventDefault();
      apiHandler.updateAdmin(
        $scope.object.admin,
        $stateParams.id,
        function (result) {
          if (result.status == 200) {
            alert("update successfully");
          }
        }
      );
    };
  },
]);
