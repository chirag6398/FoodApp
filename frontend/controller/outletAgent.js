///<reference path="../module/module.js"/>

app.controller("outletAgentController", [
  "$scope",
  "$location",
  "$state",
  "toastNotifications",
  "outletAgentFactory",
  "outletAgentService",
  "$interval",
  function (
    $scope,
    $location,
    $state,
    toastNotifications,
    outletAgentFactory,
    outletAgentService,
    $interval
  ) {
    $scope.isLoading = true;

    outletAgentFactory.getOutletAgentPage(function (err, result) {
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
      outletAgentService.debouncing(
        $scope.object.searchText,
        $scope.object.outlet._id,
        function (err, result) {
          console.log(err, result);
          if (result) {
            $scope.object.searchTextResult = result.data;
            console.log(result.data);
          } else {
            $scope.object.searchTextResult = [];
          }
        }
      );
    };

    $scope.updateAdmin = function ($event) {
      // console.log($scope.object.admin);
      outletAgentService.updateAdmin(
        $scope.object.admin,
        $scope.object.admin._id,
        function (result) {
          console.log(result);
        }
      );
    };

    $scope.changePassword = function ($event) {
      outletAgentService.updatePassword(
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
        var value = outletAgentFactory.isTableAvailable(
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
      $scope.object.cart = outletAgentFactory.addToCart(
        $scope.object.cart,
        product
      );
      $scope.object.cartProducts = outletAgentFactory.cartsProducts(
        $scope.object.cart
      );
      if ($scope.object.cartProducts.length < 3) {
        outletAgentFactory.getRecommendedProduct(
          $scope.object.cartProducts,
          $scope.object.outlet._id,
          function (err, result) {
            console.log(err, result);
            $scope.object.recommendedProducts = result.data;
          }
        );
      } else {
        $scope.object.recommendedProducts = [];
      }

      $scope.object.amount = outletAgentFactory.totalPrice($scope.object.cart);
      $scope.object.payableAmount =
        $scope.object.amount +
        outletAgentFactory.addTaxes($scope.object.taxes, $scope.object.amount);
    };

    $scope.plus = function (product) {
      $scope.object.cart = outletAgentFactory.addToCart(
        $scope.object.cart,
        product
      );

      $scope.object.amount = outletAgentFactory.totalPrice($scope.object.cart);
      $scope.object.payableAmount =
        $scope.object.amount +
        outletAgentFactory.addTaxes($scope.object.taxes, $scope.object.amount);
    };

    $scope.minus = function (product) {
      $scope.object.cart = outletAgentFactory.removeFromCart(
        $scope.object.cart,
        product
      );

      if ($scope.object.cart.length === 0)
        $scope.object.recommendedProducts = [];

      $scope.object.amount = outletAgentFactory.totalPrice($scope.object.cart);
      $scope.object.payableAmount =
        $scope.object.amount +
        outletAgentFactory.addTaxes($scope.object.taxes, $scope.object.amount);
    };

    $scope.orderHandler = function () {
      $scope.object.orderBtn = "placing...";
      // console.log($scope.object.type);
      outletAgentFactory.placeOrder(
        $scope.object.customer,
        $scope.object.type,
        $scope.object.orderNo,
        $scope.object.brand,
        $scope.object.cart,
        $scope.object.outlet,
        $scope.object.allotedTables,
        function (err, result) {
          if (result) {
            toastNotifications.success("order placed successfull");

            if ($scope.type === "dine-in") {
              var indx = outletAgentFactory.updateTablesIndexes(
                $scope.object.tables,
                $scope.object.allotedTables
              );

              indx.forEach(function (value) {
                $scope.object.tables[value].isAvailable = false;
              });
            }

            $scope.orderNo = outletAgentFactory.generateOrderId();
            $scope.object.cart = [];
            $scope.object.amount = 0;
            $scope.object.saved = false;
            $scope.object.recommendedProducts = [];
            $scope.object.orderBtn = "placed order";
            $scope.object.btnText = "Enter";
            $scope.object.customer = {};
            $scope.object.type = null;
            $scope.object.recommendedProducts = [];
          } else {
            console.log(err);
            toastNotifications.error("sorry order is not placed try later");
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
      toastNotifications.success("Logout successfull");
      $state.go("login");
    };
  },
]);
