///<reference path="../module/module.js"/>
app.controller("brandAdminCategoryController", [
  "$scope",
  "$rootScope",
  "brandApi",
  "brandAdminFactory",
  "toastNotifications",
  function (
    $scope,
    $rootScope,
    brandApi,
    brandAdminFactory,
    toastNotifications
  ) {
    $scope.object = {
      btnText: "Add Super Category",
      brand: null,
      superCategories: [],
      isLoading: true,
      superCategory: null,
    };

    brandApi.getBrandAdminPage();
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.object.brand = result.data.data;

        brandApi.getSuperCategoryByBrandId(
          $scope.object.brand._id,
          function (err, result) {
            console.log(result);

            $scope.object.isLoading = false;
            if (result) {
              $scope.object.superCategories = result.data;
            } else {
              toastNotifications.error(err.message);
            }
          }
        );
      }
    });

    $scope.addCategory = function ($event) {
      $event.preventDefault();
      $scope.object.btnText = "adding...";

      brandAdminFactory.addSuperCategory(
        $scope.object.superCategory,
        $scope.object.brand,
        function (err, result) {
          if (result) {
            $scope.object.superCategories.push(result.data);
            $scope.object.btnText = "added";
            $("#exampleModal").modal("hide");
            toastNotifications.success("added successfully");
          } else {
            $scope.object.btnText = "add";
            toastNotifications.error(err.message);
          }
        }
      );
    };

    $scope.setData = function (data) {
      $scope.object.category = { ...data };
    };

    $scope.updateSuperCategory = function ($event) {
      $event.preventDefault();

      brandAdminFactory.updateSuperCategory(
        $scope.object.category,
        $scope.object.brand,
        function (err, result) {
          console.log(result);
          if (result) {
            $("#exampleModal1").modal("hide");
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error(err.message);
          }
        }
      );
    };
  },
]);
