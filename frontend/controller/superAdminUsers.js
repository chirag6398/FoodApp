///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminUsersController", [
  "$scope",
  "adminApi",
  "$timeout",
  function ($scope, adminApi, $timeout) {
    // $rootScope.$on("passData", function (event, data) {

    // });
    $scope.object = {
      page: 1,
      limit: 5,
      pages: null,
      totalCount: 0,
      users: [],
      totalPage: 1,
      searchUser: "",
      searchTextResult: [],
    };
    var timeout = null;
    $scope.searchTextHandler = function () {
      console.log("called");
      if (timeout) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(function () {
        adminApi.searchUserBySearchText(
          $scope.object.searchUser,
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
    adminApi.getUsers(
      { limit: $scope.object.limit, page: $scope.object.page },
      function (err, result) {
        if (result) {
          console.log(result);
          $scope.object.users = result.data.data;
          $scope.object.totalCount = result.data.count;
          $scope.object.totalPage = Math.ceil(
            $scope.object.totalCount / $scope.object.limit
          );
          $scope.object.pages = new Array($scope.object.totalPage).fill(0);
        }
      }
    );
    $scope.getUserHandler = function (page, limit) {
      adminApi.getUsers({ limit: limit, page: page }, function (err, result) {
        if (result) {
          console.log(result);
          $scope.object.users = result.data.data;
          $scope.object.totalCount = result.data.count;
          $scope.object.page = page;
          $scope.object.totalPage = Math.ceil(
            $scope.object.totalCount / $scope.object.limit
          );
          $scope.object.pages = new Array($scope.object.totalPage).fill(0);
        }
      });
    };
  },
]);
