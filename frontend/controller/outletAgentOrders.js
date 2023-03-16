///<reference path="../module/module.js"/>

function checkExistanceOfTable(table, data) {
  var ind = table.findIndex(function (value) {
    return value === data.number;
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

    $rootScope.$on("passData", function (err, result) {
      if (result) {
        console.log(result);
        $scope.outletId = result.data.outlet._id;

        // if($rootScope.tables === undefined){
        //   outletAgentApi.getOutletTable($scope.outletId,function(err,result){
        //     if(result){
        //       $scope.tables=result.table;
        //     }
        //   })
        // }

        outletAgentApi.getOrders(
          $scope.outletId,

          function (err, result) {
            console.log(result.data);
            $scope.object.orders = result.data[0];
            $scope.object.tables = result.data[1].table;
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

    $scope.object.filter = {
      status: "pending",
    };
    $scope.filter = {
      type: "dine-in",
    };

    $scope.setType = function (value) {
      $scope.filter.type = value;
    };

    $scope.setData = function (items, customer, amount, tableAlloted) {
      $scope.items = items;
      $scope.amount = amount;
      $scope.customer = customer;
      $scope.allotedTable = tableAlloted;
    };
    $scope.object.filter = {
      status: "pending",
    };
    $scope.setFilter = function (value) {
      $scope.object.filter.status = value;
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

    $scope.updateStatusToCompleted = function (
      status,
      orderId,
      tableNumbers,
      type
    ) {
      outletAgentApi.updateStatus(
        {
          status: status,
          _id: orderId,
          tableNumbers: tableNumbers,
          outletId: $scope.outletId,
          orderType: type,
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
