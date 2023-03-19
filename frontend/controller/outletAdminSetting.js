///<reference path="../module/module.js"/>

app.controller("outletAdminSettingController", [
  "$scope",
  "outletAdminService",
  "$location",
  "outletApi",
  "$rootScope",
  function ($scope, outletAdminService, $location, outletApi, $rootScope) {
    $scope.object = {
      taxes: [],
      tables: [],
      outlet: null,
      tax: {},
      table: {},
      addingTables: [],
    };
    outletApi.getOutletAdminPage();

    $rootScope.$on("passData", function (err, data) {
      if (data) {
        console.log(data);
        $scope.object.outlet = data.data.outletData;
        $scope.object.taxes = data.data.outletData.taxes;
        $scope.object.tables = data.data.outletData.table;
      }
    });

    $scope.addTax = function () {
      outletAdminService.addTax(
        $scope.object.outlet._id,
        $scope.object.tax,
        function (err, result) {
          if (result) {
            $scope.object.taxes = result.data.taxes;
          } else {
            alert("something went wrong try later");
          }
        }
      );
    };

    $scope.addTableData = function () {
      if (
        !outletAdminService.isExistTable(
          $scope.object.table,
          $scope.object.tables
        )
      ) {
        $scope.object.tables.push({ ...$scope.table });
        $scope.object.addingTables.push({ ...$scope.table });
      } else {
        alert("table number existed");
      }
    };

    $scope.saveTableView = function () {
      outletAdminService.saveTableView(
        $scope.object.outlet._id,
        $scope.object.addingTables,
        function (err, result) {
          if (result) {
            alert("table added");
          } else {
            alert("try later not added");
          }
        }
      );
    };
  },
]);
