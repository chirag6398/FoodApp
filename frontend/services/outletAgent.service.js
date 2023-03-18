///<reference path="../module/module.js"/>

app.service("outletAgentService", function () {
  this.groupProductByCategories = function (products) {
    var categoryProducts = {};
    var categories = [];
    products.forEach(function (value) {
      var categoryName = value.product.category.name;
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
  this.addToCart = function (cart, product) {
    if (cart.length === 0) {
      cart.push({
        ...product,
        quantity: 1,
      });
    } else {
      var exist = cart.findIndex(function (value) {
        return value._id === product._id;
      });
      console.log(exist);
      if (exist >= 0) {
        // console.log(cart[exist])
        cart[exist].quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }
    }
    console.log(cart);

    return cart;
  };

  this.removeFromCart = function (cart, product) {
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

  this.removeItem = function (cart, product) {
    var updatedCart = cart.filter(function (value) {
      return value._id != product._id;
    });

    return updatedCart;
  };

  this.totalPrice = function (cart) {
    var amount = 0;

    cart.forEach(function (value) {
      amount = amount + value.price * value.quantity;
    });

    return amount;
  };

  this.generateOrderId = function () {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    const orderId = "ORDERID-" + timestamp + "-" + randomNumber;
    return orderId;
  };

  this.updateTablesIndexes = function (tables, allotedTables) {
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

  this.addTaxes = function (taxes, amount) {
    var extraAmount = 0;
    taxes.forEach(function (value) {
      extraAmount += (amount * value.percent) / 100;
    });
    return extraAmount;
  };

  this.isTableAvailable = function (count, tables) {
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
});
