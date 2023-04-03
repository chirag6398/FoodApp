///<reference path="../module/module.js"/>

app.controller("subCategoryController", [
  "$scope",
  "toastNotifications",
  "brandApi",
  "$rootScope",
  "$stateParams",
  "brandAdminFactory",
  function (
    $scope,
    toastNotifications,
    brandApi,
    $rootScope,
    $stateParams,
    brandAdminFactory
  ) {
    brandApi.getBrandAdminPage();
    $scope.isLoading = true;
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.brand = result.data.data;

        brandApi.getCategoryByBrandId(
          $scope.brand._id,
          $stateParams.id,
          function (err, result) {
            $scope.isLoading = false;
            if (result) {
              $scope.object = { categories: [] };

              $scope.object.categories = result.data;
            }
          }
        );
      }
    });

    $scope.category1 = {};
    // $scope.category = {};
    $scope.btnText = "Add Sub Category";

    $scope.addCategory = function ($event) {
      $event.preventDefault();
      $scope.btnText = "adding...";

      brandAdminFactory.addCategory(
        $scope.category1,
        $scope.brand,
        function (err, result) {
          if (result) {
            $scope.btnText = "add";
            $scope.object.categories.push(result.data);

            toastNotifications.success("added successfully");
          } else {
            $scope.btnText = "add";
            console.log(err);
            toastNotifications.error(err.message);
          }
          $scope.category1 = {};
          $("#exampleModal1").modal("hide");
        }
      );
    };
    $scope.setData = function (category) {
      $scope.category = category;
      console.log($scope.category);
    };
    $scope.updateCategory = function ($event) {
      $event.preventDefault();
      console.log($scope.category);
      brandAdminFactory.updateCategory(
        $scope.category,
        $scope.brand,
        function (err, result) {
          if (result) {
            toastNotifications.success("updated");
          } else {
            toastNotifications.error(err.message);
          }
        }
      );
    };
  },
]);
