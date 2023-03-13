///<reference path="../module/module.js"/>

app.controller("outletAgentOrdersController", [
  "$scope",
  "outletAgentApi",
  "$rootScope",
  function ($scope, outletAgentApi, $rootScope) {
    outletAgentApi.getOutletAgentPage();
    $scope.object = {
      orders: [],
    };
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.outletId = result.data.outlet._id;
        outletAgentApi.getOrders(
          $scope.outletId,

          function (err, result) {
            $scope.object.orders = result.data;
            $scope.object.orders.forEach(function (value) {
              value.totalQuantity = value.items.reduce(function (accum, value) {
                return accum + value.quantity;
              }, 0);
              value.totalPrice = value.items.reduce(function (accum, value) {
                return accum + value.quantity * value.price;
              }, 0);
            });
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
    $scope.updateStatus = function (status, orderId) {
      outletAgentApi.updateStatus(
        { status: status, _id: orderId },
        function (err, result) {
          if (result) {
            var indx = $scope.object.orders.findIndex(function (value) {
              return value._id === orderId;
            });
            var upData = $scope.object.orders[indx];
            upData.status = status;

            $scope.object.orders.splice(indx, 1);

            $scope.object.orders.push(upData);
          }
        }
      );
    };

    $scope.updateStatusToCompleted = function (status, orderId, tableNumbers) {
      outletAgentApi.updateStatus(
        {
          status: status,
          _id: orderId,
          tableNumbers: tableNumbers,
          outletId: $scope.outletId,
        },
        function (err, result) {
          if (result) {
            var indx = $scope.object.orders.findIndex(function (value) {
              return value._id === orderId;
            });
            var upData = $scope.object.orders[indx];
            upData.status = status;

            $scope.object.orders.splice(indx, 1);

            $scope.object.orders.push(upData);
          }
        }
      );
    };
  },
]);
