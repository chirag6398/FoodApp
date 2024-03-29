///<reference path="../module/module.js"/>

app.controller("brandAdminUsersController", [
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
      brand: null,
      users: null,
      filter: {
        email: "",
        userType: "",
        number: "",
      },
      limit: 5,
      page: 1,
      pages: null,
      totalCount: 0,
      totalPage: 1,
      one: 1,
      searchUser: "",
      searchTextResult: [],
    };
    $scope.isLoading = true;
    brandApi.getBrandAdminPage();
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.object.brand = result.data.data;

        brandApi.getBrandUsers(
          $scope.object.brand._id,
          $scope.object.filter,
          $scope.object.limit,
          $scope.object.page,
          function (err, result) {
            $scope.isLoading = false;
            if (result) {
              console.log(result);
              $scope.object.users = result.data.data;
              $scope.object.totalCount = result.data.count;
              $scope.object.totalPage = Math.ceil(
                $scope.object.totalCount / $scope.object.limit
              );
              $scope.object.pages = brandAdminFactory.getPages(
                $scope.object.totalCount,
                $scope.object.limit
              );
            }
          }
        );
      }
    });

    $scope.searchTextHandler = function () {
      brandAdminFactory.debouncing(
        $scope.object.searchUser,
        $scope.object.brand._id,
        function (err, result) {
          if (result) {
            $scope.object.searchTextResult = result.data;
          } else {
            $scope.object.searchTextResult = [];
          }
        }
      );
      if ($scope.object.searchUser === "") {
        $scope.object.searchTextResult = [];
      }
    };

    $scope.setSearchResult = function (res) {
      $scope.object.users = [res];
      $scope.object.selectedUser = res;
      $scope.object.searchTextResult = [];
    };

    $scope.getUserHandler = function (page, limit) {
      $scope.isLoading = true;
      brandApi.getBrandUsers(
        $scope.object.brand._id,
        $scope.object.filter,
        limit,
        page,
        function (err, result) {
          $scope.isLoading = false;
          if (result) {
            console.log(result);
            $scope.object.users = result.data.data;
            $scope.object.totalCount = result.data.count;
            $scope.object.page = page;

            $scope.object.totalPage = Math.ceil(
              $scope.object.totalCount / $scope.object.limit
            );
            $scope.object.pages = brandAdminFactory.getPages(
              $scope.object.totalCount,
              $scope.object.limit
            );
            $scope.object.selectedUser = null;
          } else {
            toastNotifications.error("something is wrong");
          }
        }
      );
    };
  },
]);
