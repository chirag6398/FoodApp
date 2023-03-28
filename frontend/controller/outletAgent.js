///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>
///<reference path="../services/brandAdmin.service.js"/>

app.controller("outletAgentController", [
  "$scope",
  "$location",
  "outletAgentFactory",
  "outletAgentService",
  "$interval",
  "$state",
  function (
    $scope,
    $location,
    outletAgentFactory,
    outletAgentService,
    $interval,
    $state
  ) {
    $scope.isLoading = true;
    outletAgentService.getOutletAgentPage(function (err, result) {
      console.log(err, result);
      $scope.isLoading = false;
      if (result) {
        $scope.object = result;
        $interval(function () {
          $scope.object.currentTime = new Date();
        }, 1000);
      } else {
        $location.path("login");
      }
    });

    $scope.searchTextHandler = function () {
      outletAgentFactory.debouncing(
        $scope.object.searchText,
        $scope.object.outlet._id,
        function (err, result) {
          console.log(err, result);
          if (result) {
            $scope.object.searchTextResult = result.data;
          } else {
            $scope.object.searchTextResult = [];
          }
        }
      );
    };

    $scope.updateAdmin = function ($event) {
      console.log($scope.object.admin);
      outletAgentFactory.updateAdmin(
        $scope.object.admin,
        $scope.object.admin._id,
        function (result) {
          console.log(result);
        }
      );
    };

    $scope.changePassword = function ($event) {
      outletAgentFactory.updatePassword(
        $scope.object.admin,
        $scope.object.admin._id,
        function (err, result) {
          if (result) {
            console.log(result);
          }
        }
      );
    };

    $scope.setOrderType = function (type) {
      if (type === "Dine-in") {
        var value = outletAgentService.isTableAvailable(
          $scope.object.customer.personCount,
          $scope.object.tables
        );

        if (!value) {
          alert("sorry dine in not possible at this time");
        } else {
          $scope.object.type = "dine-in";
          $scope.object.allotedTables = value;
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
      $scope.object.cartProducts = outletAgentService.cartsProducts(
        $scope.object.cart
      );

      outletAgentService.getRecommendedProduct(
        $scope.object.cartProducts,
        function (err, result) {
          console.log(err, result);
          $scope.object.recommendedProducts = result.data;
        }
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

      outletAgentService.placeOrder(
        $scope.object.customer,
        $scope.object.type,
        $scope.object.orderNo,
        $scope.object.brand,
        $scope.object.cart,
        $scope.object.outlet,
        $scope.object.allotedTables,
        function (err, result) {
          if (result) {
            alert("order placed");
            console.log(
              result,
              $scope.object.tables,
              $scope.object.allotedTables
            );
            if ($scope.type === "dine-in") {
              var indx = outletAgentService.updateTablesIndexes(
                $scope.object.tables,
                $scope.object.allotedTables
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
            $scope.object.recommendedProducts = [];
            $scope.object.orderBtn = "placed order";
            $scope.object.btnText = "Enter";
            $scope.object.customer = {};
            $scope.object.type = null;
          } else {
            console.log(err);
            alert("sorry order is not placed try later");
          }
        }
      );
    };

    $scope.setIndexing = function (ind) {
      $scope.object.isSelected = ind;

      $scope.object.products =
        $scope.object.productsData.categoryProducts[
          $scope.object.productsData.categories[$scope.object.isSelected]
        ];

      console.log($scope.object.products);
    };

    $scope.logOutHandler = function () {
      window.localStorage.removeItem("Authorization");
      $state.go("login");
    };
  },
]);
