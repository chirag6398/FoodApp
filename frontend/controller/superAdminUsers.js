///<reference path="../module/module.js"/>

app.controller("superAdminUsersController", [
  "$scope",
  "adminApi",
  "superAdminFactory",
  function ($scope, adminApi, superAdminFactory) {
    $scope.object = {
      page: 1,
      limit: 5,
      pages: null,
      totalCount: 0,
      users: [],
      totalPage: 1,
      one: 1,
      searchUser: "",
      searchTextResult: [],
      filter: {
        userType: "",
        email: "",
        number: "",
        brandName: "",
      },
      isLoading: true,
    };

    $scope.searchTextHandler = function () {
      // $scope.object.isLoading = true;
      superAdminFactory.debouncing(
        $scope.object.searchUser,
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
      $scope.object.users = [res];
      $scope.object.selectedUser = res;
      $scope.object.page = 1;
      $scope.object.searchTextResult = [];
    };

    superAdminFactory.getUsers(
      $scope.object.filter,
      $scope.object.limit,
      $scope.object.page,
      function (err, result) {
        if (result) {
          console.log(result);
          $scope.object.isLoading = false;
          $scope.object.users = result.data.data;
          $scope.object.totalCount = result.data.count;
          $scope.object.totalPage = Math.ceil(
            $scope.object.totalCount / $scope.object.limit
          );
          $scope.object.pages = superAdminFactory.getPages(
            $scope.object.totalCount,
            $scope.object.limit
          );
        }
      }
    );

    $scope.getUserHandler = function (page, limit, notation) {
      $scope.object.isLoading = true;
      superAdminFactory.getUsers(
        $scope.object.filter,
        limit,
        page,
        function (err, result) {
          $scope.object.isLoading = false;
          if (result) {
            console.log(result);
            $scope.object.users = result.data.data;
            $scope.object.totalCount = result.data.count;
            $scope.object.page = page;

            $scope.object.totalPage = Math.ceil(
              $scope.object.totalCount / $scope.object.limit
            );
            $scope.object.pages = superAdminFactory.getPages(
              $scope.object.totalCount,
              $scope.object.limit
            );
            $scope.object.selectedUser = null;
            $scope.object.pages = superAdminFactory.updatePages(
              page,
              $scope.object.totalPage
            );
          } else {
            alert("something is wrong");
          }
        }
      );
    };
  },
]);
