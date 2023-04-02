///<reference path="../module/module.js"/>

app.controller("outletAdminSettingController", [
  "$scope",
  "outletAdminFactory",
  "$location",
  "outletApi",
  "$rootScope",
  function ($scope, outletAdminFactory, $location, outletApi, $rootScope) {
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
      outletAdminFactory.addTax(
        $scope.object.outlet._id,
        $scope.object.tax,
        function (err, result) {
          if (result) {
            $scope.object.taxes = result.data.taxes;
          } else {
            alert("something went wrong try later/already exist");
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
        $scope.object.tables.push({ ...$scope.table });
        $scope.object.addingTables.push({ ...$scope.table });
      } else {
        alert("table number existed");
      }
    };

    $scope.saveTableView = function () {
      outletAdminFactory.saveTableView(
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
            alert("tax removed");
          } else {
            alert("something went wrong");
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
            alert("updated successfully");
            $("#exampleModal").modal("hide");
          } else {
            alert("failed");
          }
        }
      );
    };
  },
]);
