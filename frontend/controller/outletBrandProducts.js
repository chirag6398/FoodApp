///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandProductsController", [
  "$scope",
  "outletApi",
  "$location",
  "apiHandler",
  "$rootScope",
  function ($scope, outletApi, $location, apiHandler, $rootScope) {
    outletApi.getOutletAdminPage();
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
            console.log(result);
            $scope.categories = result.data;
          }
        );
      }
    });

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
