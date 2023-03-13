///<reference path="../module/module.js"/>
function isExistTable(table, tables) {
  var ind = tables.findIndex(function (value) {
    return +value.number === table.number;
  });
  console.log(table, tables, ind);
  return ind >= 0;
}
app.controller("outletAdminSettingController", [
  "$scope",
  "$http",
  "$location",
  "outletApi",
  "$rootScope",
  function ($scope, $http, $location, outletApi, $rootScope) {
    $scope.object = {
      taxes: [],
      tables: [],
    };
    outletApi.getOutletAdminPage();

    $rootScope.$on("passData", function (err, data) {
      if (data) {
        console.log(data);
        $scope.outletName = data.data.outletData.name;
        $scope.outletId = data.data.outletData._id;
        $scope.object.taxes = data.data.outletData.taxes;
        $scope.object.tables = data.data.outletData.table;
        // outletApi.getTaxes($scope.outletId, function (err, result) {
        //   console.log(result);
        //   $scope.object.taxes = result.data.taxes;
        // });
      }
    });

    $rootScope.$on("notEligible", function (err, isEligible) {
      if (!isEligible) {
        $location.path("login");
      }
    });
    $scope.tax = {};
    $scope.table = {};

    $scope.addTax = function () {
      console.log($scope.tax);
      outletApi.addTax(
        { _id: $scope.outletId, tax: $scope.tax },
        function (err, result) {
          console.log(err, result);

          $scope.object.taxes = result.data.taxes;
        }
      );
    };
    $scope.addingTables = [];
    $scope.addTableData = function () {
      console.log($scope.table);
      if (!isExistTable($scope.table, $scope.object.tables)) {
        $scope.object.tables.push({ ...$scope.table });
        $scope.addingTables.push({ ...$scope.table });
      } else {
        alert("table number existed");
      }
    };

    $scope.saveTableView = function () {
      //   console.log({ _id: $scope.outletId, tables: $scope.object.tables });
      outletApi.saveTableView(
        { _id: $scope.outletId, tables: $scope.addingTables },
        function (err, result) {
          console.log(err, result);
        }
      );
    };
  },
]);
