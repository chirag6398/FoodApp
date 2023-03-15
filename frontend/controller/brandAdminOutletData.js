///<reference path="../module/module.js"/>

app.controller("brandAdminOutletDataController", [
  "$scope",
  "$stateParams",
  "brandApi",
  function ($scope, $stateParams, brandApi) {
    console.log($stateParams.id);
    brandApi.getOutlet({ _id: $stateParams.id }, function (err, result) {
      if (result) {
        console.log(result);
        $scope.outlet = result.data;
        $scope.data = $scope.outlet;
      }
    });

    $scope.updateName = function (outletId) {
      brandApi.updateOutletName(
        { _id: outletId, name: $scope.data.name },
        function (err, result) {
          if (result) {
            console.log(result);
          }
        }
      );
    };

    $scope.updateLocation = function (outletId) {
      brandApi.updateLocation(
        { location: $scope.data.location, _id: outletId },
        function (err, result) {
          if (result) {
            console.log(result);
          } else {
            console.log(err);
          }
        }
      );
    };
    $scope.updateContactInfo = function (outletId) {
      brandApi.updateContactInfo(
        { contactInfo: $scope.data.contactInfo, _id: outletId },
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
