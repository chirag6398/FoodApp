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
    };
    adminApi.getBrand($stateParams.id, function (err, result) {
      if (result) {
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
        $scope.object._id,
        $scope.object.data.name,
        function (err, result) {
          if (result) {
            console.log(result);
          }
        }
      );
    };

    $scope.updateLocation = function () {
      adminApi.updateLocation(
        { location: $scope.data.location, _id: brandId },
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
      adminApi.updateContactInfo(
        { contactInfo: $scope.data.contactInfo, _id: brandId },
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
