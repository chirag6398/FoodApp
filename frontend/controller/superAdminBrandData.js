///<reference path="../module/module.js"/>

app.controller("superAdminBrandDataController", [
  "$scope",
  "$location",
  "adminApi",
  "$stateParams",
  "superAdminFactory",
  "toastNotifications",
  function (
    $scope,
    $location,
    adminApi,
    $stateParams,
    superAdminFactory,
    toastNotifications
  ) {
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
        toastNotifications.error("unable to fetch data");
      }
    });

    $scope.changeLogo = function ($event) {
      superAdminFactory.changeLogo(
        $scope.object.brand._id,
        $scope.object.data.logo,
        function (err, result) {
          if (result) {
            console.log(result);
            $("#exampleModal1").modal("hide");
            toastNotifications.success("logo has been updated successfully");
          } else {
            toastNotifications.error("please try later ");
          }
        }
      );
    };

    $scope.updateName = function () {
      superAdminFactory.updateName(
        $scope.object.brand._id,
        $scope.object.data.name,
        function (err, result) {
          if (result) {
            console.log(result);
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error("please try later ");
          }
        }
      );
    };

    $scope.updateLocation = function () {
      superAdminFactory.updateLocation(
        $scope.object.data.location,
        $scope.object.brand._id,
        function (err, result) {
          if (result) {
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error("please try later ");
          }
        }
      );
    };
    $scope.updateContactInfo = function () {
      superAdminFactory.updateContactInfo(
        $scope.object.data.contactInfo,
        $scope.object.brand._id,
        function (err, result) {
          if (result) {
            console.log(result);
            toastNotifications.success("updated successfully");
          } else {
            console.log(err);
            toastNotifications.error("please try later ");
          }
        }
      );
    };
  },
]);
