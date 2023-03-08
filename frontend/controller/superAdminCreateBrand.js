///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminCreateBrandController", [
  "$scope",
  "$http",
  "$location",
  "adminApi",
  "apiHandler",
  "$state",
  "$rootScope",
  function (
    $scope,
    $http,
    $location,
    adminApi,
    apiHandler,
    $state,
    $rootScope
  ) {
    $scope.isAccess = false;
    adminApi.getAdminPage();
    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      $scope.btnText = "Create";
      $scope.superAdminId = data._id;
      $scope.isAccess = true;
    });

    $scope.btnText = "Add Admin";

    adminApi.getBrands(function (err, result) {
      if (result) {
        $scope.object = { brands: [] };
        $scope.object.brands = result.data;
        console.log($scope.brands);
      }
    });

    $scope.admin = {};

    $scope.createBrandAdmin = function ($event, brandId, brandName) {
      $event.preventDefault();
      $scope.btnText = "processing";

      console.log($scope.admin);

      adminApi.postAddBrandAdmin(
        $scope.admin,
        brandId,
        brandName,
        function (err, result) {
          if (result) {
            console.log(result);
            $scope.btnText = "successful";
            $("#exampleModal").modal("hide");
          } else {
            $scope.btnText = "successful";
            console.log(err);
          }
        }
      );
    };

    $scope.deactivateBrand = function (brandId) {
      console.log(brandId);
      apiHandler.deactivateBrand(brandId, function (result) {
        console.log(result);
      });
    };

    $scope.activateBrand = function (brandId) {
      console.log(brandId);
      apiHandler.activateBrand(brandId, function (result) {
        console.log(result);
      });
    };

    $scope.deleteBrand = function (brandId) {
      apiHandler.deleteBrand(brandId, function (err, result) {
        if (result) {
          console.log(result);
        }
      });
    };

    $scope.createBrand = function ($event) {
      $event.preventDefault();
      $scope.btnText = "creating...";
      console.log($scope.brand);

      var brandData = new FormData();

      brandData.append("name", $scope.brand.name);
      brandData.append("file", $scope.brand.logo);
      brandData.append("number", $scope.brand.number);
      brandData.append("email", $scope.brand.email);
      brandData.append("address", $scope.brand.address);
      brandData.append("city", $scope.brand.city);
      brandData.append("description", $scope.brand.description);
      brandData.append("pinCode", $scope.brand.pinCode);

      adminApi.createBrand(brandData, function (err, result) {
        console.log("result", result);

        console.log($scope.brands);
        if (result) {
          $scope.btnText = "created";
          $scope.object.brands.push(result.data);
          $("#createBrand").modal("hide");
        } else {
          $scope.btnText = "failed";
        }
      });
    };
  },
]);
