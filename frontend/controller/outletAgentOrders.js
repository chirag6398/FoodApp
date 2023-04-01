///<reference path="../module/module.js"/>

app.controller("outletAgentOrdersController", [
  "$scope",
  "outletAgentFactory",
  "outletAgentService",
  "$stateParams",
  "socketService",
  "toastNotifications",
  function (
    $scope,
    outletAgentFactory,
    outletAgentService,
    $stateParams,
    socketService,
    toastNotifications
  ) {
    $scope.isLoading = true;
    socketService.socket.on($stateParams.id, function (data) {
      console.log(data);
      $scope.object.orders.push(data);
    });

    outletAgentFactory.getOutletAgentPage(function (err, result) {
      if (result) {
        outletAgentService.getOrders(result, function (err, result) {
          $scope.isLoading = false;
          if (result) {
            $scope.object = result;
          }
        });
      } else {
        toastNotifications.error("please try later ");
      }
    });

    $scope.setType = function (value) {
      $scope.object.filter.type = value;
      outletAgentService.getOrder($scope.object, function (err, result) {
        $scope.isLoading = false;
        if (result) {
          $scope.object.orders = result;
        }
      });
    };

    $scope.setFilter = function (value) {
      $scope.object.filter.status = value;
      outletAgentService.getOrder($scope.object, function (err, result) {
        $scope.isLoading = false;
        if (result) {
          $scope.object.orders = result;
        }
      });
    };

    $scope.setData = function (items, customer, amount, tableAlloted) {
      $scope.object.items = items;
      $scope.object.amount = amount;
      $scope.object.customer = customer;
      $scope.object.allotedTable = tableAlloted;
    };

    $scope.updateStatus = function (status, orderId) {
      outletAgentService.updateStatus(status, orderId, function (err, result) {
        if (result) {
          toastNotifications.info("status updated ");

          var indx = outletAgentService.getIndxById(
            $scope.object.orders,
            orderId
          );
          var upData = $scope.object.orders[indx];
          upData.status = status;

          $scope.object.orders.splice(indx, 1);

          $scope.object.orders.push(upData);
        } else {
          toastNotifications.error("plz try later");
        }
      });
    };

    $scope.updateStatusToCompleted = function (
      status,
      orderId,
      tableNumbers,
      type
    ) {
      outletAgentService.updateStatusToCompleted(
        status,
        orderId,
        tableNumbers,
        $scope.object.outlet._id,
        type,
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
            toastNotifications.warning("plz try later");
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
      outletAgentService.updateTableNo(
        orderId,
        $scope.object.outlet._id,
        $scope.object.newTable,
        oldTables,
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
