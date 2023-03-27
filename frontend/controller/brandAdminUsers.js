///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminUsersController", [
  "$scope",
  "$rootScope",
  "brandApi",
  "brandAdminService",
  function ($scope, $rootScope, brandApi, brandAdminService) {
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
            if (result) {
              console.log(result);
              $scope.object.users = result.data.data;
              $scope.object.totalCount = result.data.count;
              $scope.object.totalPage = Math.ceil(
                $scope.object.totalCount / $scope.object.limit
              );
              $scope.object.pages = brandAdminService.getPages(
                $scope.object.totalCount,
                $scope.object.limit
              );
            }
          }
        );
      }
    });

    $scope.searchTextHandler = function () {
      brandAdminService.debouncing(
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

    $scope.getUserHandler = function (page, limit) {
      $scope.object.isLoading = true;
      brandApi.getBrandUsers(
        $scope.object.brand._id,
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
            $scope.object.pages = brandAdminService.getPages(
              $scope.object.totalCount,
              $scope.object.limit
            );
          } else {
            alert("something is wrong");
          }
        }
      );
    };
  },
]);
