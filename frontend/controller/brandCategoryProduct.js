///<reference path="../module/module.js"/>

app.controller("categoryProductController", [
  "$scope",
  "$rootScope",
  "brandApi",
  "$stateParams",
  "brandAdminFactory",
  "toastNotifications",
  function (
    $scope,
    $rootScope,
    brandApi,
    $stateParams,
    brandAdminFactory,
    toastNotifications
  ) {
    $scope.object = {
      products: [],
      product: null,
      btnText: "Add product",
      updateProduct: null,
    };
    $scope.isLoading = true;
    brandAdminFactory.getProductsInBrand(function (err, result) {
      $scope.isLoading = false;
      if (result) {
        console.log(result);
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

      brandAdminFactory.updateProduct(
        $scope.object.updateProduct,
        function (err, result) {
          console.log(err, result);
          if (result) {
            toastNotifications.success("updated");
          } else {
            toastNotifications.error("failed");
          }
        }
      );
    };

    $scope.createProduct = function ($event) {
      $event.preventDefault();
      $scope.object.btnText = "adding";
      brandAdminFactory.addProduct(
        $scope.object.product,
        function (err, result) {
          if (result) {
            $scope.object.btnText = "added";
            console.log(result.data);
            $scope.object.products.push(result.data);
            $("#exampleModal").modal("hide");
            toastNotifications.success("product created");
          } else {
            toastNotifications.error("product not created");
            console.log(err);
          }
        }
      );
    };
  },
]);
