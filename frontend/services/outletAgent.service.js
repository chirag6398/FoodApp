///<reference path="../module/module.js"/>

app.service("outletAgentService", function (outletAgentFactory) {
  var obj = {};
  obj.groupProductByCategories = function (products) {
    var categoryProducts = {};
    var categories = [];
    products.forEach(function (value) {
      var categoryName = value.product.superCategory.category.name;
      var product = value.product;
      var indx = categories.findIndex(function (value) {
        return value === categoryName;
      });
      if (indx !== -1) {
        categoryProducts[categoryName].push(product);
      } else {
        categories.push(categoryName);
        categoryProducts = {
          ...categoryProducts,
          [categoryName]: [product],
        };
      }
    });

    return { categories, categoryProducts };
  };
  obj.addToCart = function (cart, product) {
    if (cart === undefined) cart = [];
    var exist = cart.findIndex(function (value) {
      return value._id === product._id;
    });

    if (exist >= 0) {
      cart[exist].quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    return cart;
  };

  obj.removeFromCart = function (cart, product) {
    var exist = cart.findIndex(function (value) {
      return value._id === product._id;
    });
    console.log(exist);
    if (exist >= 0) {
      cart[exist].quantity--;
      if (cart[exist].quantity == 0) {
        var updatedCart = cart.filter(function (value) {
          return value._id != product._id;
        });
        return updatedCart;
      }
    } else {
      cart.push(product);
    }
    return cart;
  };

  obj.removeItem = function (cart, product) {
    var updatedCart = cart.filter(function (value) {
      return value._id != product._id;
    });

    return updatedCart;
  };

  obj.totalPrice = function (cart) {
    var amount = 0;

    cart.forEach(function (value) {
      amount = amount + value.price * value.quantity;
    });

    return amount;
  };

  obj.generateOrderId = function () {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    const orderId = "ORDERNO-" + timestamp + "-" + randomNumber;
    return orderId;
  };

  obj.getOutletAgentPage = function (cb) {
    outletAgentFactory.getOutletAgentPage(function (err, result) {
      console.log(err, result);
      if (result) {
        var data = result.data;
        var brand = data.outlet.brand;
        var tables = data.outlet.table;
        var outlet = data.outlet;
        var admin = data.agent;
        var taxes = data.outlet.taxes;
        var productsData = obj.groupProductByCategories(outlet.products);

        var products =
          productsData.categoryProducts[productsData.categories[0]];

        var currentTime = null;
        var orderNo = obj.generateOrderId();
        var customer = {};
        var cart = [];
        var amount = 0;
        var btnText = "Enter";
        var orderBtn = "place order";
        var type = null;
        var saved = false;
        var isSelected = 0;
        var payableAmount = 0;
        var allotedTables = null;

        var cartProducts = [];
        var recommendedProducts = [];
        var searchText = "";
        var searchTextResult = [];
        cb(null, {
          brand,
          tables,
          outlet,
          admin,
          taxes,
          productsData,
          products,
          currentTime,
          orderNo,
          customer,
          cart,
          amount,
          btnText,
          orderBtn,
          type,
          saved,
          isSelected,
          payableAmount,
          allotedTables,
          cartProducts,
          recommendedProducts,
          searchText,
          searchTextResult,
        });
      } else {
        cb(err, null);
      }
    });
  };

  obj.updateTablesIndexes = function (tables, allotedTables) {
    var indexes = [];
    allotedTables.forEach(function (tableNumber) {
      for (var x = 0; x < tables.length; x++) {
        if (tables[x].number == tableNumber) {
          indexes.push(x);
          break;
        }
      }
    });

    return indexes;
  };

  obj.addTaxes = function (taxes, amount) {
    var extraAmount = 0;
    taxes.forEach(function (value) {
      extraAmount += (amount * value.percent) / 100;
    });
    console.log(extraAmount);
    return extraAmount;
  };
  obj.getOrders = function (data, cb) {
    var outlet = data.data.outlet;
    var tables = outlet.table;
    var orders = [];
    var activeIndex = [];
    var newTable = [];
    var filter = {
      status: "pending",
      type: "dine-in",
    };
    var limit = 10;
    var page = 1;
    var item = null;
    var customer = null;
    var amount = 0;
    var allotedTable = null;
    var swapBtn = "Apply swaps";
    outletAgentFactory.getOrders(
      outlet._id,
      filter,
      limit,
      page,
      function (err, result) {
        if (result) {
          orders = result.data.result;
          var count = result.data.count;

          orders.forEach(function (value) {
            value.totalQuantity = value.items.reduce(function (accum, value) {
              return accum + value.quantity;
            }, 0);
            value.totalPrice = value.items.reduce(function (accum, value) {
              return accum + value.quantity * value.price;
            }, 0);
          });
          cb(null, {
            outlet,
            tables,
            orders,
            activeIndex,
            newTable,
            filter,
            item,
            customer,
            amount,
            allotedTable,
            swapBtn,
            limit,
            page,
          });
        } else {
          cb(err, null);
        }
      }
    );
  };
  obj.isTableAvailable = function (count, tables) {
    var allotedTables = [];

    for (var x of tables) {
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
  };

  obj.placeOrder = function (
    customer,
    type,
    orderNo,
    brand,
    cart,
    outlet,
    allotedTables,
    cb
  ) {
    var data = {
      customer: {
        name: customer.name,
        number: customer.number,
      },
      type: type,
      orderId: orderNo,
      brand: {
        _id: brand._id,
        name: brand.name,
      },
      item: cart,
      outlet: {
        _id: outlet._id,
        name: outlet.name,
      },
      allotedTables: allotedTables,
    };
    console.log(data);

    outletAgentFactory.placeOrder(data, function (err, result) {
      if (result) {
        cb(null, result);
      } else {
        cb(err, result);
      }
    });
  };

  obj.checkExistanceOfTable = function (table, data) {
    var ind = table.findIndex(function (value) {
      return value === data.number;
    });

    return ind;
  };
  obj.getIndxById = function (orders, id) {
    return orders.findIndex(function (value) {
      return value._id === id;
    });
  };

  obj.getOrder = function (data, cb) {
    outletAgentFactory.getOrders(
      data.outlet._id,
      data.filter,
      data.limit,
      data.page,
      function (err, result) {
        if (result) {
          orders = result.data.result;
          data.count = result.data.count;

          orders.forEach(function (value) {
            value.totalQuantity = value.items.reduce(function (accum, value) {
              return accum + value.quantity;
            }, 0);
            value.totalPrice = value.items.reduce(function (accum, value) {
              return accum + value.quantity * value.price;
            }, 0);
          });
          cb(null, orders);
        } else {
          cb(err, null);
        }
      }
    );
  };
  obj.updateTableNo = function (orderId, outletId, newTable, oldTables, cb) {
    outletAgentFactory.updateTableNo(
      {
        _id: orderId,
        outletId: outletId,
        newTables: newTable,
        oldTables: oldTables,
      },
      cb
    );
  };
  obj.cartsProducts = function (products) {
    var productsName = [];
    products.forEach(function (value) {
      productsName.push(value.name);
    });
    return productsName;
  };

  obj.getRecommendedProduct = function (products, id, cb) {
    outletAgentFactory.getRecommendedProduct(products, id, cb);
  };

  obj.updateStatus = function (status, orderId, cb) {
    outletAgentFactory.updateStatus({ status: status, _id: orderId }, cb);
  };

  obj.updateStatusToCompleted = function (
    status,
    orderId,
    tableNumbers,
    id,
    type,
    cb
  ) {
    outletAgentFactory.updateStatus(
      {
        status: status,
        _id: orderId,
        tableNumbers: tableNumbers,
        outletId: id,
        orderType: type,
      },
      cb
    );
  };
  return obj;
});
