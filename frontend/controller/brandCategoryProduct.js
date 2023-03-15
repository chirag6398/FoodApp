///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("categoryProductController", [
  "$scope",
  "$http",
  "$rootScope",
  "brandApi",
  "$stateParams",
  function ($scope, $http, $rootScope, brandApi, $stateParams) {
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.brandName = result.data.data.name;
        $scope.brandId = result.data.data._id;
        $scope.brandLogo = result.data.data.logo;
        $scope.categoryId = $stateParams.id;
        $scope.categoryName = $stateParams.name;

        brandApi.getProductsInBrand(
          { categoryId: $scope.categoryId, brandId: $scope.brandId },
          function (err, result) {
            if (result) {
              $scope.object = { products: [] };
              console.log(result.data);
              $scope.object.products = result.data;
            }
          }
        );
        brandApi.getSuperCategory($scope.categoryId, function (err, result) {
          if (result) {
            console.log(result);
            $scope.superCategoryId = result.data.superCategory._id;
            $scope.superCategoryName = result.data.superCategory.name;
          }
        });
      }
    });

    $scope.btnText = "Add product";
    $scope.product = {};

    $scope.setProduct = function (product) {
      console.log(product);
      $scope.updateProduct = {
        ...product,
      };
    };

    $scope.updateProductHandler = function ($event) {
      $event.preventDefault();
      console.log($scope.updateProduct);

      var updatedFormData = new FormData();
      updatedFormData.append("name", $scope.updateProduct.name);
      updatedFormData.append("file", $scope.updateProduct.image);
      updatedFormData.append("categoryId", $scope.categoryId);
      updatedFormData.append("categoryName", $stateParams.name);
      updatedFormData.append("superCategoryId", $scope.superCategoryId);
      updatedFormData.append("superCategoryName", $scope.superCategoryName);
      updatedFormData.append("brandId", $scope.brandId);
      updatedFormData.append("brandName", $scope.brandName);
      updatedFormData.append("price", $scope.updateProduct.price);
      updatedFormData.append("description", $scope.updateProduct.description);
      updatedFormData.append("_id", $scope.updateProduct._id);

      $http
        .post(
          "http://localhost:5000/api/product/updateProduct",
          updatedFormData,
          {
            transformRequest: angular.identity,
            headers: { "Content-Type": undefined },
          }
        )
        .then(
          function (response) {
            console.log(response.data);
          },
          function (error) {
            console.log(error);
          }
        );
    };

    $scope.createProduct = function ($event) {
      $event.preventDefault();
      var formData = new FormData();
      formData.append("name", $scope.product.productName);
      formData.append("file", $scope.product.image);
      formData.append("categoryId", $scope.categoryId);
      formData.append("categoryName", $stateParams.name);
      formData.append("superCategoryId", $scope.superCategoryId);
      formData.append("superCategoryName", $scope.superCategoryName);
      formData.append("brandId", $scope.brandId);
      formData.append("brandName", $scope.brandName);
      formData.append("price", $scope.product.price);
      formData.append("description", $scope.product.description);
      console.log($scope.product.image);

      brandApi.addProduct(formData, function (err, result) {
        if (result) {
          console.log(result.data);
          $scope.object.products.push(result.data);
          $("exampleModal").modal("hide");
        } else {
          console.log(err);
        }
      });
    };
  },
]);
