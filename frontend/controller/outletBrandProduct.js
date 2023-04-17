///<reference path="../module/module.js"/>

app.controller("brandProductController", [
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

      isLoading: true,
      products: null,
    };
    outletApi.getOutletAdminPage();

    $rootScope.$on("passData", function (err, data) {
      if (data) {
        console.log(data);
        $scope.object.outlet = data.data.outletData;
        $scope.object.brand = data.data.outletData.brand;
        outletAdminFactory.getProducts(
          $stateParams.id,
          $scope.object.outlet._id,
          function (err, result) {
            $scope.object.isLoading = false;
            outletAdminFactory.scrollToProducts();
            if (result.data.length) {
              $scope.object.products = result.data;
            } else if (result) {
              toastNotifications.info(
                "all products of this category already added"
              );
            }
          }
        );
      }
    });

    $scope.addProduct = function (product) {
      $scope.object.isLoading = true;
      outletAdminFactory.addProductToOutlet(
        product,
        $scope.object.outlet._id,
        function (err, result) {
          $scope.object.isLoading = false;
          if (result) {
            var indx = outletAdminFactory.getIndx(
              $scope.object.products,
              product
            );
            $scope.object.products.splice(indx, 1);
            toastNotifications.success("product added ");
          } else {
            toastNotifications.error("please try later");
          }
        }
      );
    };
  },
]);
