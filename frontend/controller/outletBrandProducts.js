///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandProductsController", [
  "$scope",
  "outletApi",
  "outletAdminFactory",
  "apiHandler",
  "$rootScope",
  "$timeout",
  function (
    $scope,
    outletApi,
    outletAdminFactory,
    apiHandler,
    $rootScope,
    $timeout
  ) {
    $scope.object = {
      brand: null,
      outlet: null,
      superCategories: null,
      subCategories: null,
      isLoading: true,
      products: null,
    };

    $timeout(function () {
      if ($scope.object.brand === null) {
        outletApi.getOutletAdminPage();
      }
    }, 1300);

    $rootScope.$on("passData", function (err, data) {
      if (data) {
        console.log(data);
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

    $scope.getSubCategory = function (id) {
      $scope.object.isLoading = true;
      outletAdminFactory.getSubCategory(id, function (err, result) {
        console.log(err, result);
        if (result) {
          $scope.object.isLoading = false;
          outletAdminFactory.scrollToSubCategory();
          $scope.object.subCategories = result.data;
          if ($scope.object.subCategories.length == 0) {
            alert("no sub category");
          }
        }
      });
    };

    $scope.getProducts = function (id) {
      $scope.object.isLoading = true;
      outletAdminFactory.getProducts(
        id,
        $scope.object.outlet._id,
        function (err, result) {
          $scope.object.isLoading = false;
          outletAdminFactory.scrollToProducts();
          if (result.data.length) {
            $scope.object.products = result.data;
          } else if (result) {
            alert("all products of this category already added");
          }
        }
      );
    };

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
            alert("product added ");
          }
        }
      );
    };
  },
]);
