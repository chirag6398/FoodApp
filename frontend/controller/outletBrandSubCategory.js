///<reference path="../module/module.js"/>

app.controller("outletBrandSubCategoryController", [
  "$scope",
  "outletApi",
  "outletAdminFactory",
  "$stateParams",
  "$rootScope",
  "$timeout",
  "toastNotifications",
  function (
    $scope,
    outletApi,
    outletAdminFactory,
    $stateParams,
    $rootScope,
    $timeout,
    toastNotifications
  ) {
    $scope.object = {
      brand: null,
      outlet: null,

      subCategories: null,
      isLoading: true,
      products: null,
    };

    outletApi.getOutletAdminPage();

    $rootScope.$on("passData", function (err, data) {
      if (data) {
        console.log(data);
        $scope.object.outlet = data.data.outletData;
        $scope.object.brand = data.data.outletData.brand;

        outletAdminFactory.getSubCategory(
          $stateParams.id,
          function (err, result) {
            console.log(err, result);
            if (result) {
              $scope.object.isLoading = false;
              outletAdminFactory.scrollToSubCategory();
              $scope.object.subCategories = result.data;
              if ($scope.object.subCategories.length == 0) {
                toastNotifications.info("no sub category");
              }
            }
          }
        );
      }
    });
  },
]);
