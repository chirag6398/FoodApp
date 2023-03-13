///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminCreateBrandController", [
  "$scope",
  "adminApi",
  "$rootScope",
  function ($scope, adminApi, $rootScope) {
    $scope.isAccess = false;
    adminApi.getAdminPage();
    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      if (data) {
        $scope.btnText = "Create";
        $scope.superAdminId = data._id;
        $scope.isAccess = true;
      } else {
      }
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
      adminApi.deactivateBrand(brandId, function (result) {
        console.log(result);
      });
    };

    $scope.activateBrand = function (brandId) {
      console.log(brandId);
      adminApi.activateBrand(brandId, function (result) {
        console.log(result);
      });
    };

    $scope.deleteBrand = function (brandId) {
      adminApi.deleteBrand(brandId, function (err, result) {
        if (result) {
          console.log(result);
        }
      });
    };

    $scope.createBrand = function ($event) {
      $event.preventDefault();
      $scope.btnText = "creating...";

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
