///<reference path="../module/module.js"/>

app.controller("outletAdminProductsController", [
  "$scope",
  "$http",
  "$location",
  "outletApi",
  "$rootScope",
  "toastNotifications",
  function (
    $scope,
    $http,
    $location,
    outletApi,
    $rootScope,
    toastNotifications
  ) {
    $scope.object = {
      outlet: null,
      brand: null,
      products: null,
      isLoading: true,
    };

    outletApi.getOutletAdminPage();
    $rootScope.$on("passData", function (err, data) {
      if (data) {
        $scope.object.outlet = data.data.outletData;

        $scope.object.brand = data.data.outletData.brand;
        outletApi.getOutletProducts(
          $scope.object.outlet._id,
          function (err, result) {
            if (result) {
              console.log(result);
              $scope.object.isLoading = false;
              $scope.object.products = result.data;
            }
            console.log($scope.object.products);
          }
        );
      }
    });

    $scope.removeProduct = function (product) {
      outletApi.removeOutletProduct(
        product,
        $scope.object.outlet._id,
        function (err, result) {
          if (result) {
            toastNotifications.success("product removed");
          }
        }
      );
    };

    $scope.editProduct = function (product) {
      $scope.productPrice.$setPristine();
      $scope.newProduct = { ...product };
    };

    $scope.editPrice = function (product) {
      console.log("called");
      outletApi.updateProductPrice(
        $scope.object.outlet._id,
        product,
        function (err, result) {
          if (result) {
            toastNotifications.success("price edited");
          } else {
            toastNotifications.error(err.message);
          }
          $("#exampleModal").modal("hide");
        }
      );
    };
  },
]);
