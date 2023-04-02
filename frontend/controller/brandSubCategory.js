///<reference path="../module/module.js"/>

app.controller("subCategoryController", [
  "$scope",
  "$http",
  "$location",
  "brandApi",
  "$rootScope",
  "$stateParams",
  function ($scope, $http, $location, brandApi, $rootScope, $stateParams) {
    brandApi.getBrandAdminPage();
    $scope.isLoading = true;
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.brandName = result.data.data.name;
        $scope.brandId = result.data.data._id;
        $scope.brandLogo = result.data.data.logo;

        brandApi.getCategoryByBrandId(
          result.data.data._id,
          $stateParams.id,
          function (err, result) {
            $scope.isLoading = false;
            if (result) {
              $scope.object = { categories: [] };
              console.log(result);
              console.log(result.data);
              $scope.object.categories = result.data;
            }
          }
        );
      }
    });

    $scope.category1 = {};
    $scope.btnText = "Add Sub Category";

    $scope.addCategory = function ($event) {
      $event.preventDefault();
      $scope.btnText = "adding...";
      console.log($scope.category1);
      var formData = new FormData();
      formData.append("name", $scope.category1.name);
      formData.append("file", $scope.category1.logo);
      formData.append("superCategoryName", $stateParams.name);
      formData.append("superCategoryId", $stateParams.id);
      formData.append("brandName", $scope.brandName);
      formData.append("brandId", $scope.brandId);

      brandApi.addCategory(formData, function (err, result) {
        console.log(result);
        if (result) {
          $scope.btnText = "added";
          $scope.object.categories.push(result.data);
          $("#exampleModal").modal("hide");
        } else {
          $scope.btnText = "failed";
          console.log(err);
        }
      });
    };
    $scope.setData = function (category) {
      $scope.category = category;
    };
    $scope.updateCategory = function ($event) {
      $event.preventDefault();
      console.log($scope.category);
      var formData = new FormData();

      formData.append("name", $scope.category.name);
      formData.append("file", $scope.category.logo);
      formData.append("_id", $scope.category._id);
      formData.append("brandId", $scope.brandId);
      $http
        .post("http://localhost:5000/api/brandAdmin/updateCategory", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then(
          function (response) {
            console.log(response.data);
          },
          function (error) {
            console.log(error);
          }
        );
    };
  },
]);
