///<reference path="../module/module.js"/>

app.controller("outletAdminOrdersController", [
  "$scope",
  "outletAdminFactory",
  "toastNotifications",
  function ($scope, outletAdminFactory, toastNotifications) {
    $scope.object = {
      page: 1,
      limit: 10,
      filter: null,
    };

    $scope.isLoading = true;
    outletAdminFactory.getOrders(
      $scope.object.limit,
      $scope.object.page,
      $scope.object.filter,
      function (err, result) {
        $scope.isLoading = false;
        if (result) {
          $scope.object = result;

          console.log(result);
        } else {
          toastNotifications.error(err.message);
        }
      }
    );

    $scope.getOrderHandler = function (page, limit) {
      $scope.isLoading = true;
      outletAdminFactory.getOrders(
        limit,
        page,
        $scope.object.filter,
        function (err, result) {
          $scope.isLoading = false;
          if (result) {
            $scope.object = result;
            console.log(result);
          } else {
            toastNotifications.error(err.message);
          }
        }
      );
    };
  },
]);
