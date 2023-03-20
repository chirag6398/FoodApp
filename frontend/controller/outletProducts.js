///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("outletAdminProductsController", [
  "$scope",
  "$http",
  "$location",
  "outletApi",
  "$rootScope",
  function ($scope, $http, $location, outletApi, $rootScope) {
    $scope.object = {
      outlet: null,
      brand: null,
      products: null,
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
            alert("product removed");
          }
        }
      );
    };
  },
]);
