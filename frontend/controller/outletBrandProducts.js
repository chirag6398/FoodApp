///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandProductsController", [
  "$scope",
  "outletApi",
  "outletAdminService",
  "apiHandler",
  "$rootScope",
  "$timeout",
  function (
    $scope,
    outletApi,
    outletAdminService,
    apiHandler,
    $rootScope,
    $timeout
  ) {
    $scope.object = {
      brand: null,
      outlet: null,
      superCategories: null,
      subCategories: null,
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
        outletAdminService.getSuperCategories(
          $scope.object.brand._id,
          function (err, result) {
            console.log(err, result);
            $scope.object.superCategories = result.data;
          }
        );
      }
    });

    $scope.getSubCategory = function (id) {
      outletAdminService.getSubCategory(id, function (err, result) {
        console.log(err, result);
        if (result) {
          $scope.object.subCategories = result.data;
          if ($scope.object.subCategories.length == 0) {
            alert("no sub category");
          }
        }
      });
    };

    $scope.getProducts = function (id) {
      outletAdminService.getProducts(
        id,
        $scope.object.outlet._id,
        function (err, result) {
          if (result.data.length) {
            $scope.products = result.data;
          } else if (result) {
            alert("all products of this category already added");
          }
        }
      );
    };

    $scope.addProduct = function (product) {
      console.log(product);
      outletAdminService.addProductToOutlet(
        product,
        $scope.object.outlet._id,
        function (err, result) {
          if (result) {
            alert("product added ");
          }
        }
      );
    };
  },
]);
