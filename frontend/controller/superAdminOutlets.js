///<reference path="../module/module.js"/>

app.controller("superAdminOutletsController", [
  "$scope",
  "superAdminService",
  "$rootScope",
  function ($scope, superAdminService, $rootScope) {
    $scope.object = {
      outlets: null,
      isLoading: true,
      filter: {
        email: "",
        brandName: "",
        number: "",
      },
      limit: 5,
      page: 1,
      pages: null,
      totalCount: 0,
      totalPage: 1,
      one: 1,
      searchOutlet: "",
      searchTextResult: [],
    };

    superAdminService.getOutlets(
      $scope.object.filter,
      $scope.object.limit,
      $scope.object.page,
      function (err, result) {
        console.log(result, err);
        if (result) {
          $scope.object.isLoading = false;
          $scope.object.outlets = result.data.data;
          $scope.object.totalCount = result.data.count;
          $scope.object.totalPage = Math.ceil(
            $scope.object.totalCount / $scope.object.limit
          );
          $scope.object.pages = superAdminService.getPages(
            $scope.object.totalCount,
            $scope.object.limit
          );
        }
      }
    );

    $scope.searchTextHandler = function () {
      superAdminService.outletDebouncing(
        $scope.object.searchOutlet,
        function (err, result) {
          // $scope.object.isLoading = false;
          if (result) {
            $scope.object.searchTextResult = result.data;
          } else {
            $scope.object.searchTextResult = [];
          }
        }
      );
    };

    $scope.setSearchResult = function (res) {
      $scope.object.outlets = [res];
      $scope.object.selectedOutlet = res;
      $scope.object.searchTextResult = [];
    };

    $scope.getOutletHandler = function (page, limit) {
      $scope.object.isLoading = true;
      superAdminService.getOutlets(
        $scope.object.filter,
        limit,
        page,
        function (err, result) {
          $scope.object.isLoading = false;
          if (result) {
            console.log(result);
            $scope.object.outlets = result.data.data;
            $scope.object.totalCount = result.data.count;
            $scope.object.page = page;

            $scope.object.totalPage = Math.ceil(
              $scope.object.totalCount / $scope.object.limit
            );
            $scope.object.pages = superAdminService.getPages(
              $scope.object.totalCount,
              $scope.object.limit
            );
            $scope.object.selectedOutlet = null;
          } else {
            alert("something is wrong");
          }
        }
      );
    };
  },
]);
