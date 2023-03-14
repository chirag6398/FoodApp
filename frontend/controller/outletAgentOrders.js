///<reference path="../module/module.js"/>

function checkExistanceOfTable(table, data) {
  var ind = table.findIndex(function (value) {
    return value.number === data.number;
  });

  return ind;
}
app.controller("outletAgentOrdersController", [
  "$scope",
  "outletAgentApi",
  "$rootScope",
  function ($scope, outletAgentApi, $rootScope) {
    outletAgentApi.getOutletAgentPage();
    $scope.object = {
      orders: [],
      activeIndex: [],
      newTable: [],
    };
    console.log($rootScope.tables);
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        console.log(result);
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

    $scope.setData = function (items, customer, amount, tableAlloted) {
      $scope.items = items;
      $scope.amount = amount;
      $scope.customer = customer;
      $scope.allotedTable = tableAlloted;
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

    $scope.updateStatusToCompleted = function (status, ord) {
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
    // $scope.newTable = [];
    // $scope.activeIndex = [];
    $scope.swapTableHandler = function (table, index) {
      console.log(table);
      var existIndex = checkExistanceOfTable($scope.object.newTable, table);
      if (existIndex === -1) {
        $scope.object.newTable.push(table.number);
        $scope.object.activeIndex.push(index);
      } else {
        $scope.object.newTable.splice(existIndex, 1);
        $scope.object.activeIndex.splice(existIndex, 1);
      }

      // console.log($scope.activeIndex);
    };

    $scope.updateTableNo = function (orderId, oldTables) {
      outletAgentApi.updateTableNo(
        {
          _id: orderId,
          outletId: $scope.outletId,
          newTables: $scope.object.newTable,
          oldTables: oldTables,
        },
        function (err, result) {
          console.log(err, result);
        }
      );
    };
  },
]);
