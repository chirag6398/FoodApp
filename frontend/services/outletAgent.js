///<reference path="../module/module.js"/>

app.service("outletAgentService", function ($http, $rootScope, $timeout) {
  var obj = {};
  var timeout = null;

  obj.getOutletAgentPage = function (cb) {
    $http
      .get("http://localhost:5000/api/outletAgent/getOutletAgentPage", {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.updateAdmin = function (admin, id, cb) {
    var data = {
      ...admin,
      id: id,
    };

    $http
      .put("http://localhost:5000/api/employee/updateUser", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(response);
      })
      .catch(function (err) {});
  };

  obj.updatePassword = function (admin, id, cb) {
    var data = {
      ...admin,
      id: id,
    };
    $http
      .put("http://localhost:5000/api/employee/updatePassword", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.placeOrder = function (data, cb) {
    console.log(data);

    $http
      .post("http://localhost:5000/api/order/createOrder", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  obj.getOrders = function (outletId, filter, limit, page, cb) {
    console.log(outletId);
    $http
      .get(
        "http://localhost:5000/api/order/getOrders?outletId=" +
          outletId +
          "&type=" +
          filter.type +
          "&status=" +
          filter.status +
          "&limit=" +
          limit +
          "&page=" +
          page,
        {
          headers: {
            Authorization: window.localStorage.getItem("Authorization"),
          },
        }
      )
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  obj.updateStatus = function (data, cb) {
    $http
      .put("http://localhost:5000/api/order/updateStatus", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  obj.getProductByName = function (searchText, outletId, cb) {
    $http
      .get(
        "http://localhost:5000/api/outletAgent/getProductByName/" +
          outletId +
          "/" +
          searchText,

        {
          headers: {
            Authorization: window.localStorage.getItem("Authorization"),
          },
        }
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.updateTableNo = function (data, cb) {
    $http
      .put("http://localhost:5000/api/order/updateTableNo", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.debouncing = function (text, outletId, cb) {
    if (timeout) {
      $timeout.cancel(timeout);
    }
    timeout = $timeout(function () {
      obj.getProductByName(text, outletId, function (err, result) {
        if (result) {
          cb(null, result);
        } else {
          cb(err, null);
        }
      });
    }, 800);
  };

  obj.getRecommendedProduct = function (products, id, cb) {
    $http
      .get(
        "http://localhost:5000/api/outletAgent/getRecommendedProduct?products=" +
          products +
          "&id=" +
          id,
        {
          headers: {
            Authorization: window.localStorage.getItem("Authorization"),
          },
        }
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  return obj;
});
