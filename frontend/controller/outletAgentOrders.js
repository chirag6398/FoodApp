///<reference path="../module/module.js"/>

app.controller("outletAgentOrdersController", [
  "$scope",
  "$http",
  "$location",
  "outletAgentApi",
  "cartService",
  "$interval",
  "$rootScope",
  function (
    $scope,
    $http,
    $location,
    outletAgentApi,
    cartService,
    $interval,
    $rootScope
  ) {
    outletAgentApi.getOutletAgentPage();
    $scope.object = {
      orders: [],
    };
    $rootScope.$on("passData", function (err, result) {
      //   consolelog(result);
      if (result) {
        outletAgentApi.getOrders(
          result.data.outlet._id,

          function (err, result) {
            console.log(result);

            $scope.object.orders = result.data;
            $scope.object.orders.forEach(function (value) {
              value.totalQuantity = value.items.reduce(function (accum, value) {
                return accum + value.quantity;
              }, 0);
              value.totalPrice = value.items.reduce(function (accum, value) {
                return accum + value.quantity * value.price;
              }, 0);
            });
            console.log($scope.object.orders);
          }
        );
      }
    });

    $scope.filter = {
      status: "pending",
    };

    $scope.setData = function (items, customer, amount) {
      $scope.items = items;
      $scope.amount = amount;
      $scope.customer = customer;
    };
    $scope.filter = {
      status: "pending",
    };
    $scope.setFilter = function (value) {
      $scope.filter.status = value;
    };
    $scope.updateStatus = function (status, orderId, indx) {
      console.log(status);
      outletAgentApi.updateStatus(
        { status: status, _id: orderId },
        function (err, result) {
          if (result) {
            console.log(result);
            $scope.object.orders[indx].status = status;
          }
        }
      );
    };
  },
]);
