///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminCategoryController", [
  "$scope",
  "$rootScope",
  "brandApi",
  "brandAdminService",
  "toastNotifications",
  function (
    $scope,
    $rootScope,
    brandApi,
    brandAdminService,
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

            if (result) {
              $scope.object.superCategories = result.data;

              $scope.object.isLoading = false;
            } else {
              toastNotifications.error(
                "plz try later some error has occured on fetching categories"
              );
            }
          }
        );
      }
    });

    $scope.addCategory = function ($event) {
      $event.preventDefault();
      $scope.object.btnText = "adding...";

      brandAdminService.addSuperCategory(
        $scope.object.superCategory,
        $scope.object.brand,
        function (err, result) {
          if (result) {
            $scope.object.superCategories.push(result.data);
            $scope.object.btnText = "added";
            $("#exampleModal").modal("hide");
            toastNotifications.success("added successfully");
          } else {
            $scope.object.btnText = "try later";
            toastNotifications.error("failed please try later");
          }
        }
      );
    };

    $scope.setData = function (data) {
      $scope.object.category = data;
    };

    $scope.updateSuperCategory = function ($event) {
      $event.preventDefault();

      brandAdminService.updateSuperCategory(
        $scope.object.category,
        $scope.object.brand,
        function (err, result) {
          console.log(result);
          if (result) {
            $("#exampleModal1").modal("hide");
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error("not updated");
          }
        }
      );
    };
  },
]);
