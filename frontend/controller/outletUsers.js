///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("outletUsersController", [
  "$scope",
  "$state",
  "outletAdminService",
  "outletApi",
  "$rootScope",
  "toastNotifications",
  function (
    $scope,
    $state,
    outletAdminService,
    outletApi,
    $rootScope,
    toastNotifications
  ) {
    outletApi.getOutletAdminPage();

    $rootScope.$on("passData", function (err, data) {
      if (data) {
        console.log(data);
        outletAdminService.getUsers(data, function (err, result) {
          if (result) {
            $scope.object = result;
            console.log($scope.object);
          } else {
            toastNotifications.error(err.message);
          }
        });
      }
    });

    // $scope.searchTextHandler = function () {
    //   brandAdminService.debouncing(
    //     $scope.object.searchUser,
    //     $scope.object.brand._id,
    //     function (err, result) {
    //       if (result) {
    //         $scope.object.searchTextResult = result.data;
    //       } else {
    //         $scope.object.searchTextResult = [];
    //       }
    //     }
    //   );
    //   if ($scope.object.searchUser === "") {
    //     $scope.object.searchTextResult = [];
    //   }
    // };

    // $scope.setSearchResult = function (res) {
    //   $scope.object.users = [res];
    //   $scope.object.selectedUser = res;
    //   $scope.object.searchTextResult = [];
    // };

    $scope.getUserHandler = function (page, limit) {
      outletApi.getUsers(
        $scope.object.outlet._id,
        limit,
        page,
        $scope.object.filter,
        function (err, result) {
          if (result) {
            console.log(result);
            $scope.object.users = result.data.data;
            $scope.object.totalCount = result.data.count;
            $scope.object.page = page;

            $scope.object.totalPage = Math.ceil(
              $scope.object.totalCount / $scope.object.limit
            );
            $scope.object.pages = outletAdminService.getPages(
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
