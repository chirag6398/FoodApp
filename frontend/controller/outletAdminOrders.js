///<reference path="../module/module.js"/>

app.controller("outletAdminOrdersController", [
  "$scope",
  "outletApi",
  "outletAdminFactory",
  "toastNotifications",
  "$stateParams",

  function (
    $scope,
    outletApi,
    outletAdminFactory,
    toastNotifications,
    $stateParams
  ) {
    $scope.object = {
      page: 1,
      limit: 10,
    };
    $scope.isLoading = true;
    outletAdminFactory.getOrders(
      $scope.object.limit,
      $scope.object.page,
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
      outletAdminFactory.getOrders(limit, page, function (err, result) {
        $scope.isLoading = false;
        if (result) {
          $scope.object = result;
          console.log(result);
        } else {
          toastNotifications.error(err.message);
        }
      });
    };
  },
]);
