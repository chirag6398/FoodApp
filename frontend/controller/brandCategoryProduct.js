///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("categoryProductController", [
  "$scope",
  "$rootScope",
  "brandApi",
  "$stateParams",
  "brandAdminService",
  function ($scope, $rootScope, brandApi, $stateParams, brandAdminService) {
    $scope.object = {
      products: [],
      product: null,
      btnText: "Add product",
      updateProduct: null,
    };

    // brandApi.getBrandAdminPage();
    // $rootScope.$on("passData", function (err, result) {
    //   if (result) {
    //     console.log(result);
    //     $scope.object.brand = result.data.data;
    //   }
    // });

    brandAdminService.getProductsInBrand(function (err, result) {
      if (result) {
        $scope.object.products = result.data;
      }
    });

    $scope.setProduct = function (product) {
      console.log(product);
      $scope.object.updateProduct = {
        ...product,
      };
    };

    $scope.updateProductHandler = function ($event) {
      $event.preventDefault();

      brandAdminService.updateProduct(
        $scope.object.updateProduct,
        function (err, result) {
          console.log(err, result);
          if (result) {
            alert("updated");
          }
        }
      );
    };

    $scope.createProduct = function ($event) {
      $event.preventDefault();

      brandAdminService.addProduct(
        $scope.object.product,
        function (err, result) {
          if (result) {
            console.log(result.data);
            $scope.object.products.push(result.data);
            $("exampleModal").modal("hide");
          } else {
            alert("product not created");
            console.log(err);
          }
        }
      );
    };
  },
]);
