///<reference path="../module/module.js"/>

app.controller("outletAgentOrdersController", [
  "$scope",
  "outletAgentFactory",
  "outletAgentService",
  function ($scope, outletAgentFactory, outletAgentService) {
    $scope.object = {
      orders: [],
      activeIndex: [],
      newTable: [],
      tables: null,
      outlet: null,
      filter: {
        status: "pending",
        type: "dine-in",
      },
      item: null,
      customer: null,
      amount: 0,
      allotedTable: null,
      swapBtn: "Apply swaps",
    };

    outletAgentFactory.getOutletAgentPage(function (err, result) {
      $scope.object.outlet = result.data.outlet;
      $scope.object.tables = result.data.outlet.table;

      outletAgentFactory.getOrders(
        $scope.object.outlet._id,

        function (err, result) {
          if (result) {
            $scope.object.orders = result.data;

            $scope.object.orders.forEach(function (value) {
              value.totalQuantity = value.items.reduce(function (accum, value) {
                return accum + value.quantity;
              }, 0);
              value.totalPrice = value.items.reduce(function (accum, value) {
                return accum + value.quantity * value.price;
              }, 0);
            });
          } else {
            alert("something is wrong in fetching orders");
          }
        }
      );
    });

    $scope.setType = function (value) {
      $scope.object.filter.type = value;
    };

    $scope.setFilter = function (value) {
      $scope.object.filter.status = value;
    };

    $scope.setData = function (items, customer, amount, tableAlloted) {
      $scope.object.items = items;
      $scope.object.amount = amount;
      $scope.object.customer = customer;
      $scope.object.allotedTable = tableAlloted;
    };

    $scope.updateStatus = function (status, orderId) {
      outletAgentFactory.updateStatus(
        { status: status, _id: orderId },
        function (err, result) {
          if (result) {
            var indx = outletAgentService.getIndxById(
              $scope.object.orders,
              orderId
            );
            var upData = $scope.object.orders[indx];
            upData.status = status;

            $scope.object.orders.splice(indx, 1);

            $scope.object.orders.push(upData);
          } else {
            alert("try later");
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
      outletAgentFactory.updateStatus(
        {
          status: status,
          _id: orderId,
          tableNumbers: tableNumbers,
          outletId: $scope.object.outlet._id,
          orderType: type,
        },
        function (err, result) {
          if (result) {
            var indx = outletAgentService.getIndxById(
              $scope.object.orders,
              orderId
            );
            var upData = $scope.object.orders[indx];
            upData.status = status;

            $scope.object.orders.splice(indx, 1);

            $scope.object.orders.push(upData);
          } else {
            alert("try later");
          }
        }
      );
    };

    $scope.swapTableHandler = function (table, index) {
      var existIndex = outletAgentService.checkExistanceOfTable(
        $scope.object.newTable,
        table
      );
      if (existIndex === -1) {
        $scope.object.newTable.push(table.number);
        $scope.object.activeIndex.push(index);
      } else {
        $scope.object.newTable.splice(existIndex, 1);
        $scope.object.activeIndex.splice(existIndex, 1);
      }
    };

    $scope.updateTableNo = function (orderId, oldTables) {
      $scope.object.swapBtn = "Applying";
      outletAgentFactory.updateTableNo(
        {
          _id: orderId,
          outletId: $scope.object.outlet._id,
          newTables: $scope.object.newTable,
          oldTables: oldTables,
        },
        function (err, result) {
          console.log(err, result);
          if (result) {
            $scope.object.swapBtn = "Applied";
            var indx = outletAgentService.getIndxById(
              $scope.object.orders,
              orderId
            );
            $scope.object.orders[indx].tableNumber = $scope.object.newTable;
          }
        }
      );
    };
  },
]);
