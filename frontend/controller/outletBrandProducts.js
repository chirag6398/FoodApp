///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandProductsController", [
  "$scope",
  "outletApi",
  "outletAdminService",
  "apiHandler",
  "$rootScope",
  function ($scope, outletApi, outletAdminService, apiHandler, $rootScope) {
    $scope.object = {
      brand: null,
      outlet: null,
      superCategories: null,
      subCategories: null,
    };
    outletApi.getOutletAdminPage();
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
      console.log(id);
      apiHandler.getProductByCategory(
        {
          brandId: $scope.brandId,
          categoryId: id,
          outletId: $scope.outletId,
        },
        function (result) {
          console.log(result);
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
      apiHandler.addProductToOutlet(
        product,
        $scope.outletId,
        function (err, result) {
          console.log(result);
          console.log(err);
        }
      );
    };
  },
]);
