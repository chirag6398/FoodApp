///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminCategoryController", [
  "$scope",
  "$http",
  "$rootScope",
  "brandApi",
  function ($scope, $http, $rootScope, brandApi) {
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.brandName = result.data.data.name;
        $scope.brandId = result.data.data._id;
        brandApi.getSuperCategoryByBrandId(
          result.data.data._id,
          function (err, result) {
            console.log(result);

            if (result) {
              $scope.object = { superCategories: [] };
              $scope.object.superCategories = result.data;

              $scope.isLoading = false;
            } else {
              alert("plz try later some error has occured");
            }
          }
        );
      }
    });

    // brandApi.getBrandAdminPage(function (err, result) {
    //   if (result) {
    //     $scope.brandName = result.data.name;
    //     $scope.brandId = result.data._id;
    //     brandApi.getSuperCategoryByBrandId(
    //       result.data._id,
    //       function (err, result) {
    //         console.log(result);

    //         if (result) {
    //           $scope.object = { superCategories: [] };
    //           $scope.object.superCategories = result.data;

    //           $scope.isLoading = false;
    //         } else {
    //           alert("plz try later some error has occured");
    //         }
    //       }
    //     );
    //   } else {
    //     // $location.path("login");
    //   }
    // });

    $scope.btnText = "Add Super Category";
    $scope.addCategory = function ($event) {
      $event.preventDefault();
      $scope.btnText = "adding...";
      console.log($scope.superCategory);
      var formData = new FormData();
      formData.append("name", $scope.superCategory.name);
      formData.append("file", $scope.superCategory.logo);
      formData.append("brandName", $scope.brandName);
      formData.append("brandId", $scope.brandId);

      brandApi.addSuperCategory(formData, function (err, result) {
        if (result) {
          console.log(result);
          $scope.object.superCategories.push(result.data);
          $scope.btnText = "added";
          $("#exampleModal").modal("hide");
        } else {
          $scope.btnText = "try later";
        }
      });
    };

    $scope.setData = function (data) {
      console.log(data);
      $scope.category = data;
    };
    $scope.updateSuperCategory = function ($event) {
      $event.preventDefault();
      console.log($scope.category);

      var formData = new FormData();

      formData.append("name", $scope.category.name);
      formData.append("file", $scope.category.logo);
      formData.append("_id", $scope.category._id);
      formData.append("brandId", $scope.brandId);

      $http
        .post(
          "http://localhost:5000/api/brandAdmin/updateSuperCategory",
          formData,
          {
            transformRequest: angular.identity,
            headers: { "Content-Type": undefined },
          }
        )
        .then(
          function (response) {
            console.log(response.data);
            $("exampleModal1").modal("hide");
          },
          function (error) {
            console.log(error);
          }
        );
    };
  },
]);
