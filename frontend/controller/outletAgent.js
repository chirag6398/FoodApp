///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>
///<reference path="../services/cart.service.js"/>

app.controller("outletAgentController", [
  "$scope",
  "$location",
  "outletAgentFactory",
  "outletAgentService",
  "$interval",
  function (
    $scope,
    $location,
    outletAgentFactory,
    outletAgentService,
    $interval
  ) {
    $scope.object = {
      tables: [],
      brand: null,
      outlet: null,
      admin: null,
      taxes: [],
      currentTime: null,
      orderNo: null,
      customer: {},
      cart: [],
      amount: 0,
      btnText: "Enter",
      orderBtn: "place order",
      type: null,
      saved: false,
      productsData: null,
      products: null,
      isSelected: 0,
      payableAmount: 0,
    };

    outletAgentFactory.getOutletAgentPage(function (err, result) {
      console.log(err, result);
      if (result) {
        $scope.object.brand = result.data.outlet.brand;
        $scope.object.tables = result.data.outlet.table;
        // console.log($scope.object.tables);
        $scope.object.outlet = result.data.outlet;
        $scope.object.admin = result.data.agent;
        $scope.object.taxes = result.data.outlet.taxes;
        $scope.object.productsData =
          outletAgentService.groupProductByCategories(
            $scope.object.outlet.products
          );
        $scope.object.products =
          $scope.object.productsData.categoryProducts[
            $scope.object.productsData.categories[0]
          ];
      } else {
        $location.path("login");
      }
    });

    $interval(function () {
      $scope.object.currentTime = new Date();
    }, 1000);

    $scope.searchTextHandler = function () {
      outletAgentFactory.debouncing(
        $scope.searchText,
        $scope.outletId,
        function (err, result) {
          console.log(err, result);
          if (result) {
            $scope.searchTextResult = result.data;
          } else {
            $scope.searchTextResult = [];
          }
        }
      );
    };

    $scope.updateAdmin = function ($event, id) {
      console.log(id, $scope.admin);
      outletAgentFactory.updateAdmin(
        $scope.admin,
        $scope.admin._id,
        function (result) {
          console.log(result);
        }
      );
    };

    $scope.changePassword = function ($event, id) {
      console.log(id);
      outletAgentFactory.updatePassword(
        $scope.admin,
        id,
        function (err, result) {
          if (result) {
            console.log(result);
          }
        }
      );
    };

    $scope.object.orderNo = outletAgentService.generateOrderId();

    $scope.setOrderType = function (type) {
      if (type === "Dine-in") {
        var value = outletAgentService.isTableAvailable(
          $scope.object.customer.personCount,
          $scope.object.tables
        );
        console.log(value);
        if (!value) {
          alert("sorry dine in not possible at this time");
        } else {
          $scope.object.type = "dine-in";
          $scope.allotedTables = value;
          $("#dineIn").modal("hide");
        }
      } else {
        $scope.object.type = "take-away";
      }
    };

    $scope.saveCustomerData = function () {
      $scope.object.btnText = "saved";
      $scope.object.saved = true;

      $("#exampleModal").modal("hide");
    };

    $scope.addToCart = function (product) {
      $scope.object.cart = outletAgentService.addToCart(
        $scope.object.cart,
        product
      );

      $scope.object.amount = outletAgentService.totalPrice($scope.object.cart);
      $scope.object.payableAmount =
        $scope.object.amount +
        outletAgentService.addTaxes($scope.object.taxes, $scope.object.amount);
    };

    $scope.plus = function (product) {
      $scope.object.cart = outletAgentService.addToCart(
        $scope.object.cart,
        product
      );

      $scope.object.amount = outletAgentService.totalPrice($scope.object.cart);
    };

    $scope.minus = function (product) {
      $scope.object.cart = outletAgentService.removeFromCart(
        $scope.object.cart,
        product
      );

      $scope.object.amount = outletAgentService.totalPrice($scope.object.cart);
    };

    $scope.orderHandler = function () {
      $scope.object.orderBtn = "placing...";

      var data = {
        customer: {
          name: $scope.object.customer.name,
          number: $scope.object.customer.number,
        },
        type: $scope.type,
        orderId: $scope.orderNo,
        brand: {
          _id: $scope.brand._id,
          name: $scope.brand.name,
        },
        item: $scope.object.cart,
        outlet: {
          _id: $scope.outlet._id,
          name: $scope.outlet.name,
        },
        allotedTables: $scope.allotedTables,
      };

      outletAgentFactory.placeOrder(data, function (err, result) {
        if (result) {
          alert("order placed");
          console.log(result, $scope.object.tables, $scope.allotedTables);
          if ($scope.type === "dine-in") {
            var indx = outletAgentService.updateTablesIndexes(
              $scope.object.tables,
              $scope.allotedTables
            );
            console.log(indx);
            indx.forEach(function (value) {
              $scope.object.tables[value].isAvailable = false;
            });
          }

          $scope.orderNo = outletAgentService.generateOrderId();
          $scope.object.cart = [];
          $scope.object.amount = 0;
          $scope.object.saved = false;
          $scope.object.orderBtn = "placed order";
          $scope.object.btnText = "Enter";
          $scope.object.customer = {};
          $scope.object.type = null;
        }
      });
    };

    $scope.setIndexing = function (ind) {
      $scope.object.isSelected = ind;

      $scope.object.products =
        $scope.object.productsData.categoryProducts[
          $scope.object.productsData.categories[$scope.object.isSelected]
        ];

      console.log($scope.object.products);
    };
  },
]);
