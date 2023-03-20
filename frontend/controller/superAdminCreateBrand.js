///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

function getBrandIndxById(brands, id) {
  return brands.findIndex(function (value) {
    return value._id === id;
  });
}
app.controller("superAdminCreateBrandController", [
  "$scope",
  "adminApi",
  "$rootScope",
  "$timeout",
  function ($scope, adminApi, $rootScope, $timeout) {
    var timeout = null;
    $scope.object = {
      brands: [],
      searchBrand: "",
      totalBrands: 0,
      limit: 5,
      page: 1,
      totalPage: 1,
      pages: null,
      searchTextResult: [],
      selectedBrand: null,
    };

    $scope.searchTextHandler = function () {
      if (timeout) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(function () {
        adminApi.searchBrandBySearchText(
          $scope.object.searchBrand,
          function (err, result) {
            console.log(err, result);
            if (result) {
              $scope.object.searchTextResult = result.data;
            } else {
              $scope.object.searchTextResult = [];
            }
          }
        );
      }, 800);
    };
    $scope.setSearchResult = function (res) {
      $scope.object.brands = [res];
      $scope.object.selectedBrand = res;
      $scope.object.searchTextResult = [];
      // $scope.object.searchBrand = "";
    };

    $rootScope.$on("passData", function (err, data) {
      // console.log(data);
      if (data) {
        $scope.btnText = "Create";
        $scope.superAdminId = data._id;
        // $scope.isAccess = true;
      } else {
      }
    });

    $scope.btnText = "Add Admin";

    adminApi.getBrands(
      { limit: $scope.object.limit, page: $scope.object.page },
      function (err, result) {
        if (result) {
          console.log(result);
          $scope.object.brands = result.data;
          $scope.object.totalBrands = result.count;
          $scope.object.totalPage = Math.ceil(
            $scope.object.totalBrands / $scope.object.limit
          );
          $scope.object.pages = new Array($scope.object.totalPage).fill(0);
          // console.log($scope.object.totalPage);
        }
      }
    );

    $scope.getBrandHandler = function (page, limit) {
      adminApi.getBrands({ limit: limit, page: page }, function (err, result) {
        if (result) {
          console.log(result);
          $scope.object.brands = result.data;
          $scope.object.page = page;
        }
      });
    };

    $scope.admin = {};
    $scope.setBasicBrandData = function (brand) {
      $scope.brandId = brand._id;
      $scope.brandName = brand.name;
    };
    $scope.createBrandAdmin = function ($event, brandId, brandName) {
      $event.preventDefault();
      $scope.btnText = "processing";

      adminApi.postAddBrandAdmin(
        $scope.admin,
        $scope.brandId,
        $scope.brandName,
        function (err, result) {
          if (result) {
            console.log(result);
            $scope.btnText = "successful";
            $scope.admin = {};
            $("#exampleModal").modal("hide");
          } else {
            $scope.btnText = "failed try later";

            console.log(err);
          }
        }
      );
    };

    $scope.deactivateBrand = function (brandId) {
      console.log(brandId);
      adminApi.deactivateBrand(brandId, function (err, result) {
        console.log(err, result);
        if (result) {
          var indx = getBrandIndxById($scope.object.brands, brandId);

          $scope.object.brands[indx].isActive = false;
          alert("brand deactivated");
        }
      });
    };

    $scope.activateBrand = function (brandId) {
      console.log(brandId);
      adminApi.activateBrand(brandId, function (err, result) {
        console.log(err, result);
        if (result) {
          var indx = getBrandIndxById($scope.object.brands, brandId);

          $scope.object.brands[indx].isActive = true;
          alert("brand activated");
        }
      });
    };

    $scope.deleteBrand = function (brandId) {
      adminApi.deleteBrand(brandId, function (err, result) {
        if (result) {
          console.log(result);
          var indx = getBrandIndxById($scope.object.brands, brandId);

          $scope.object.brands[indx].isDeleted = true;
          alert("brand deleted successfully");
        } else {
          alert("brand not deleted try later");
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
