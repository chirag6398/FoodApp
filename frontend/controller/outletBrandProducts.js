///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandProductsController", [
  "$scope",
  "$http",
  "$location",
  "apiHandler",
  "$rootScope",
  function ($scope, $http, $location, apiHandler, $rootScope) {
    $rootScope.$on("passData", function (err, data) {
      if (data) {
        console.log(data);
        $scope.outletName = data.data.outletData.outletName;

        $scope.outletId = data.data.outletData._id;
        $scope.brandId = data.data.brandId;
        $scope.brandLogo = data.data.outletData.brand.logo;
        apiHandler.getBrandOutletProducts(
          { brandId: $scope.brandId, outletId: $scope.outletId },
          function (result) {
            $scope.categories = result.data;
          }
        );
      }
    });

    $scope.getProducts = function (id) {
      apiHandler.getProductByCategory(
        {
          brandId: $scope.brandId,
          categoryId: id,
          outletId: $scope.outletId,
        },
        function (result) {
          console.log(result);
          $scope.products = result.data;
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
