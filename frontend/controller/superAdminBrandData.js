///<reference path="../module/module.js"/>

app.controller("superAdminBrandDataController", [
  "$scope",
  "$location",
  "adminApi",
  "$stateParams",
  function ($scope, $location, adminApi, $stateParams) {
    adminApi.getBrand($stateParams.id, function (err, result) {
      if (result) {
        $scope.brand = result;
        $scope.data = $scope.brand;
      } else {
        $location.path("superAdmin");
      }
    });

    $scope.changeLogo = function ($event, brandId) {
      console.log(brandId);
      var formData = new FormData();
      formData.append("_id", brandId);
      formData.append("file", $scope.data.logo);
      adminApi.changeLogo(formData, function (err, result) {
        if (result) {
          console.log(result);
          $("#exampleModal1").modal("hide");
        } else {
          console.log(err);
        }
      });
    };

    $scope.updateName = function (brandId) {
      adminApi.updateBrandName(
        { _id: brandId, name: $scope.data.name },
        function (err, result) {
          if (result) {
            console.log(result);
          }
        }
      );
    };

    $scope.updateLocation = function (brandId) {
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
    $scope.updateContactInfo = function (brandId) {
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
