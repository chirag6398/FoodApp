///<reference path="../module/module.js"/>

app.controller("superAdminCreateBrandController", [
  "$scope",
  "adminApi",
  "superAdminFactory",
  "toastNotifications",
  function ($scope, adminApi, superAdminFactory, toastNotifications) {
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
      btnText: "Create",
      btnText1: "Add Admin",
      admin: {},
      brand: null,
      one: 1,
      isLoading: true,
    };

    $scope.searchTextHandler = function () {
      superAdminFactory.searchBrandDebouncing(
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
    };
    $scope.setSearchResult = function (res) {
      $scope.object.brands = [res];
      $scope.object.selectedBrand = res;
      $scope.object.searchTextResult = [];
    };

    superAdminFactory.getBrands(
      $scope.object.limit,
      $scope.object.page,
      function (err, result) {
        $scope.object.isLoading = false;
        if (result) {
          $scope.object.brands = result.data;
          $scope.object.totalBrands = result.count;
          $scope.object.totalPage = Math.ceil(
            $scope.object.totalBrands / $scope.object.limit
          );
          $scope.object.pages = superAdminFactory.getPages(
            $scope.object.totalBrands,
            $scope.object.limit
          );
        }
      }
    );

    $scope.getBrandHandler = function (page, limit) {
      $scope.object.isLoading = true;

      superAdminFactory.getBrands(limit, page, function (err, result) {
        $scope.object.isLoading = false;

        if (result) {
          $scope.object.brands = result.data;
          $scope.object.page = page;
          $scope.object.totalPage = Math.ceil(
            $scope.object.totalBrands / $scope.object.limit
          );
        }
      });
    };

    $scope.setBasicBrandData = function (brand) {
      $scope.object.brand = brand;
    };

    $scope.createBrandAdmin = function ($event) {
      $event.preventDefault();
      $scope.object.btnText1 = "processing";

      adminApi.postAddBrandAdmin(
        $scope.object.admin,
        $scope.object.brand._id,
        $scope.object.brand.name,
        function (err, result) {
          if (result) {
            console.log(result);
            // $scope.object.btnText1 = "Add Admin";
            $scope.object.admin = {};
            $("#exampleModal").modal("hide");
            toastNotifications.success("admin added successfully");
          } else {
            // $scope.object.btnText1 = "failed try later";
            $("#exampleModal").modal("hide");
            console.log(err);
            toastNotifications.error(err.message);
          }
          $scope.object.btnText1 = "Add Admin";
        }
      );
    };

    $scope.deactivateBrand = function (brandId) {
      adminApi.deactivateBrand(brandId, function (err, result) {
        if (result) {
          var indx = superAdminFactory.getBrandIndxById(
            $scope.object.brands,
            brandId
          );
          $scope.object.brands[indx].isActive = false;
          toastNotifications.success("deactivate brand");
        } else {
          toastNotifications.error("please try later");
        }
      });
    };

    $scope.activateBrand = function (brandId) {
      adminApi.activateBrand(brandId, function (err, result) {
        if (result) {
          var indx = superAdminFactory.getBrandIndxById(
            $scope.object.brands,
            brandId
          );
          $scope.object.brands[indx].isActive = true;
          toastNotifications.success("brand activated");
        } else {
          toastNotifications.error("try later");
        }
      });
    };

    $scope.deleteBrand = function (brandId) {
      adminApi.deleteBrand(brandId, function (err, result) {
        if (result) {
          var indx = superAdminFactory.getBrandIndxById(
            $scope.object.brands,
            brandId
          );
          $scope.object.brands[indx].isDeleted = true;
          toastNotifications.success("brand deleted successfully");
        } else {
          toastNotifications.error("brand not deleted try later");
        }
      });
    };

    $scope.createBrand = function ($event) {
      $event.preventDefault();
      $scope.object.btnText = "creating...";
      console.log($scope.object.brand);
      superAdminFactory.createBrand(
        $scope.object.brand,
        function (err, result) {
          if (result) {
            $scope.btnText = "created";
            $scope.object.brands.unshift(result.data);
            $("#createBrand").modal("hide");
            toastNotifications.success("brand created");
          } else {
            console.log(err);
            $scope.object.btnText = "Retry";
            toastNotifications.error(err.message);
          }
        }
      );
    };
    // $scope.navPage = 0;
    // $scope.navLimit = 2;
    // $scope.navPageHandler = function (page) {
    //   $scope.navPage = page;
    //   console.log($scope.navPage);
    // };
  },
]);
