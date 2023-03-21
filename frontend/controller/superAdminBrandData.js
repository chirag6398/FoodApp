///<reference path="../module/module.js"/>

app.controller("superAdminBrandDataController", [
  "$scope",
  "$location",
  "adminApi",
  "$stateParams",
  "superAdminService",
  function ($scope, $location, adminApi, $stateParams, superAdminService) {
    $scope.object = {
      brand: null,
      data: null,
      isLoading: true,
    };
    adminApi.getBrand($stateParams.id, function (err, result) {
      if (result) {
        $scope.object.isLoading = false;
        $scope.object.brand = result;
        $scope.object.data = $scope.object.brand;
      } else {
        $location.path("superAdmin");
      }
    });

    $scope.changeLogo = function ($event) {
      superAdminService.changeLogo(
        $scope.object._id,
        $scope.object.data.logo,
        function (err, result) {
          if (result) {
            console.log(result);
            $("#exampleModal1").modal("hide");
          } else {
            console.log(err);
          }
        }
      );
    };

    $scope.updateName = function () {
      superAdminService.updateName(
        $scope.object.brand._id,
        $scope.object.data.name,
        function (err, result) {
          if (result) {
            console.log(result);
          }
        }
      );
    };

    $scope.updateLocation = function () {
      superAdminService.updateLocation(
        $scope.data.location,
        $scope.object.brand._id,
        function (err, result) {
          if (result) {
            console.log(result);
          } else {
            console.log(err);
          }
        }
      );
    };
    $scope.updateContactInfo = function () {
      superAdminService.updateContactInfo(
        $scope.data.contactInfo,
        $scope.object.brand._id,
        function (err, result) {
          if (result) {
            console.log(result);
          } else {
            console.log(err);
          }
        }
      );
    };
  },
]);
