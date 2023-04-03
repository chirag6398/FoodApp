///<reference path="../module/module.js"/>

app.controller("brandAdminOutletDataController", [
  "$scope",
  "$stateParams",
  "brandApi",
  "toastNotifications",
  function ($scope, $stateParams, brandApi, toastNotifications) {
    $scope.object = {
      outlet: null,
      data: null,
    };
    $scope.isLoading = true;
    brandApi.getOutlet({ _id: $stateParams.id }, function (err, result) {
      if (result) {
        $scope.isLoading = false;
        $scope.object.outlet = result.data;
        $scope.object.data = $scope.object.outlet;
      }
    });

    $scope.updateName = function (outletId) {
      brandApi.updateOutletName(
        { _id: outletId, name: $scope.object.data.name },
        function (err, result) {
          if (result) {
            console.log(result);
            toastNotifications.success("updated");
          }
        }
      );
    };

    $scope.updateLocation = function (outletId) {
      brandApi.updateLocation(
        { location: $scope.object.data.location, _id: outletId },
        function (err, result) {
          if (result) {
            console.log(result);
            toastNotifications.success("updated");
          } else {
            console.log(err);
            toastNotifications.error("failed");
          }
        }
      );
    };
    $scope.updateContactInfo = function (outletId) {
      brandApi.updateContactInfo(
        { contactInfo: $scope.object.data.contactInfo, _id: outletId },
        function (err, result) {
          if (result) {
            console.log(result);
            toastNotifications.success("updated");
          } else {
            console.log(err);
            toastNotifications.error("failed");
          }
        }
      );
    };
  },
]);
