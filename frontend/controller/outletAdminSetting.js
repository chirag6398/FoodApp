///<reference path="../module/module.js"/>

app.controller("outletAdminSettingController", [
  "$scope",
  "outletAdminFactory",
  "$location",
  "outletApi",
  "$rootScope",
  "toastNotifications",
  function (
    $scope,
    outletAdminFactory,
    $location,
    outletApi,
    $rootScope,
    toastNotifications
  ) {
    $scope.object = {
      taxes: [],
      tables: [],
      outlet: null,
      tax: {},
      table: {},
      addingTables: [],
      isLoading: true,
    };
    outletApi.getOutletAdminPage();

    $rootScope.$on("passData", function (err, data) {
      $scope.object.isLoading = false;
      if (data) {
        console.log(data);
        $scope.object.outlet = data.data.outletData;
        $scope.object.taxes = data.data.outletData.taxes;
        $scope.object.tables = data.data.outletData.table;
      }
    });

    $scope.addTax = function () {
      outletAdminFactory.addTax(
        $scope.object.outlet._id,
        $scope.object.tax,
        function (err, result) {
          if (result) {
            $scope.object.taxes = result.data.taxes;
            toastNotifications.success("added successfully");
          } else {
            toastNotifications.error(err.data.message);
          }
        }
      );
    };

    $scope.addTableData = function () {
      if (
        !outletAdminFactory.isExistTable(
          $scope.object.table,
          $scope.object.tables
        )
      ) {
        $scope.object.tables.push({ ...$scope.object.table });
        console.log($scope.object.tables);
        $scope.object.addingTables.push({ ...$scope.object.table });
      } else {
        toastNotifications.error("table number existed");
      }
    };

    $scope.saveTableView = function () {
      outletAdminFactory.saveTableView(
        $scope.object.outlet._id,
        $scope.object.addingTables,
        function (err, result) {
          if (result) {
            toastNotifications.success("table added");
          } else {
            toastNotifications.error(err.message);
          }
        }
      );
    };

    $scope.editTax = function (tax) {
      $scope.object.updateTax = { ...tax };
    };

    $scope.removeTax = function (tax) {
      outletApi.removeTax(
        $scope.object.outlet._id,
        tax._id,
        function (err, result) {
          console.log(err, result);
          if (result) {
            toastNotifications.success("tax removed");
          } else {
            toastNotifications.error(err.message);
          }
        }
      );
    };

    $scope.updateTax = function () {
      outletApi.updateTax(
        $scope.object.outlet._id,
        $scope.object.updateTax,
        function (err, result) {
          console.log(err, result);
          if (result) {
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications(err.message);
          }
          $("#exampleModal").modal("hide");
        }
      );
    };
  },
]);
