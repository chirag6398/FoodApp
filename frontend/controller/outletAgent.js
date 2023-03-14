///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>
///<reference path="../services/cart.service.js"/>

function generateOrderId() {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 10000);
  const orderId = "ORDERID-" + timestamp + "-" + randomNumber;
  return orderId;
}

function addTaxes(taxes, amount) {
  var extraAmount = 0;
  taxes.forEach(function (value) {
    extraAmount += (amount * value.percent) / 100;
  });
  return extraAmount;
}

function isTableAvailable(count, tables) {
  // console.log(count);
  var allotedTables = [];

  for (var x of tables) {
    // console.log(x, count);
    if (x.isAvailable) {
      if (count >= x.capacity) {
        count = count - x.capacity;
      } else {
        count = 0;
      }
      allotedTables.push(x.number);
    }

    if (count == 0) {
      break;
    }
  }

  console.log(count, allotedTables);

  return count === 0 ? allotedTables : false;
}

app.controller("outletAgentController", [
  "$scope",
  "$timeout",
  "$location",
  "outletAgentApi",
  "cartService",
  "$interval",
  "$rootScope",
  function (
    $scope,
    $timeout,
    $location,
    outletAgentApi,
    cartService,
    $interval,
    $rootScope
  ) {
    var timeout = null;
    $scope.object = {
      tables: [],
    };
    $scope.searchTextHandler = function () {
      // console.log("called");
      if (timeout) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(function () {
        // console.log("called");
        // console.log($scope.searchText);

        outletAgentApi.getProductByName(
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
      }, 500);
    };
    outletAgentApi.getOutletAgentPage();

    $rootScope.$on("passData", function (err, result) {
      if (result) {
        console.log(result);
        $scope.brand = result.data.brand;
        $scope.outlet = result.data.outlet;
        $scope.outletId = result.data.outlet._id;
        $scope.admin = {
          userName: result.data.userName,
          email: result.data.email,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          number: result.data.number,
        };
        $scope.adminId = result.data._id;

        outletAgentApi.getOutletProducts($scope.outletId);
        outletAgentApi.getOutlet($scope.outletId, function (err, result) {
          console.log(err, result);
          $scope.taxes = result.data.taxes;
          $scope.object.tables = result.data.table;
          $rootScope.tables = $scope.object.tables;
        });
      }
    });

    $interval(function () {
      $scope.getCurrentTime();
    }, 1000);
    $scope.brandLogo = "";
    $rootScope.$on("agentProducts", function (err, result) {
      console.log(result);
      $scope.categories = [];

      if (result.data && result.data.length > 0) {
        if ($scope.brandLogo == "") {
          $scope.brandLogo = result.data[0].brandLogo;
        }
        result.data.forEach(function (value) {
          $scope.categoryProducts = {
            ...$scope.categoryProducts,
            [value.name]: value.products,
          };
          $scope.categories.push(value.name);
        });

        $scope.isSelected = 0;
        $scope.products =
          $scope.categoryProducts[$scope.categories[$scope.isSelected]];
      }
    });

    $rootScope.$on("agentProductsError", function (err, result) {
      console.log(result);
    });

    $rootScope.$on("notEligible", function (err, isEligible) {
      if (!isEligible) {
        $location.path("login");
      }
    });

    $scope.getCurrentTime = function () {
      $scope.currentTime = new Date();
    };

    $scope.updateAdmin = function ($event, id) {
      console.log(id);
      outletAgentApi.updateAdmin($scope.admin, id, function (result) {
        console.log(result);
      });
    };

    $scope.changePassword = function ($event, id) {
      console.log(id);
      outletAgentApi.updatePassword($scope.admin, id, function (err, result) {
        if (result) {
          console.log(result);
        }
      });
    };

    $scope.orderNo = generateOrderId();
    $scope.customer = {};
    $scope.amount = 0;
    $scope.btnText = "Enter";
    $scope.orderBtn = "placed order";
    $scope.saved = false;
    $scope.object = { cart: [] };
    $scope.type = null;

    $scope.setOrderType = function (type) {
      if (type === "Dine-in") {
        var value = isTableAvailable(
          $scope.customer.personCount,
          $scope.object.tables
        );
        console.log(value);
        if (!value) {
          alert("sorry dine in not possible at this time");
        } else {
          $scope.type = "dine-in";
          $scope.allotedTables = value;
          $("#dineIn").modal("hide");
        }
      } else {
        $scope.type = "take-away";
      }
    };
    $scope.saveCustomerData = function () {
      $scope.btnText = "saved";
      $scope.saved = true;

      $("#exampleModal").modal("hide");
    };
    $scope.addToCart = function (product) {
      $scope.object.cart = cartService.addToCart($scope.object.cart, product);

      $scope.amount = cartService.totalPrice($scope.object.cart);
      $scope.payableAmount =
        $scope.amount + addTaxes($scope.taxes, $scope.amount);
      // console.log($scope.object.cart);
    };
    $scope.plus = function (product) {
      $scope.object.cart = cartService.addToCart($scope.object.cart, product);

      $scope.amount = cartService.totalPrice($scope.object.cart);
    };

    $scope.minus = function (product) {
      $scope.object.cart = cartService.removeFromCart(
        $scope.object.cart,
        product
      );

      $scope.amount = cartService.totalPrice($scope.object.cart);
    };

    $scope.orderHandler = function () {
      $scope.orderBtn = "placing...";
      // console.log($scope.customer, $scope.object.cart);
      var data = {
        customer: {
          name: $scope.customer.name,
          number: $scope.customer.number,
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

      outletAgentApi.placeOrder(data, function (err, result) {
        if (result) {
          alert("order placed");
          $scope.orderNo = generateOrderId();
          $scope.object = { cart: [] };
          $scope.amount = 0;
          $scope.saved = false;
          $scope.orderBtn = "placed order";
          $scope.btnText = "Enter";
          $scope.customer = {};
          $scope.type = null;
        }
      });
    };

    $scope.setIndexing = function (ind) {
      $scope.isSelected = ind;
      $scope.products =
        $scope.categoryProducts[$scope.categories[$scope.isSelected]];
    };
  },
]);
