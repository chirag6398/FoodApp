///<reference path="../module/module.js"/>

app.controller("brandProductsController", [
  "$scope",
  "outletApi",
  "outletAdminFactory",
  "apiHandler",
  "$rootScope",
  "$timeout",
  "toastNotifications",
  function (
    $scope,
    outletApi,
    outletAdminFactory,
    apiHandler,
    $rootScope,
    $timeout,
    toastNotifications
  ) {
    $scope.object = {
      brand: null,
      outlet: null,
      superCategories: null,
      subCategories: null,
      isLoading: true,
      products: null,
    };

    outletApi.getOutletAdminPage();

    $rootScope.$on("passData", function (err, data) {
      if (data) {
        $scope.object.outlet = data.data.outletData;
        $scope.object.brand = data.data.outletData.brand;
        outletAdminFactory.getSuperCategories(
          $scope.object.brand._id,
          function (err, result) {
            $scope.object.isLoading = false;
            console.log(err, result);
            $scope.object.superCategories = result.data;
          }
        );
      }
    });
  },
]);
