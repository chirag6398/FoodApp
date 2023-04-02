///<reference path="../module/module.js"/>

app.service("apiHandler", function ($http) {
  var obj = {};

  obj.postLogin = function (data, cb) {
    $http
      .post("http://localhost:5000/api/employee/login", {
        username: data.userName,
        password: data.password,
      })
      .then(function (response) {
        cb(null, {
          token: response.data.token,
          userType: response.data.user.userType,
          admin: response.data.user,
          status: 200,
        });
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getOutletAdminPage = function (cb) {
    $http
      .get("http://localhost:5000/api/outletAdmin/getAdminPage")
      .then(function (response) {
        console.log(response);
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err);
        cb({ status: 401, message: "unauthorized user" }, null);
      });
  };

  obj.getBrands = function (cb) {
    $http
      .get("http://localhost:5000/api/superAdmin/getBrands")
      .then(function (response) {
        // console.log(response.data)
        cb(response.data);
      }),
      function (err) {
        // console.log(err);
        cb({ status: 401, message: "unauthorized" });
      };
  };

  obj.postAddBrandAdmin = function (data, cb) {
    // console.log(data);
    $http
      .post("http://localhost:5000/api/superAdmin/addBrandAdmin", data)
      .then(function (response) {
        // console.log(response);
        cb(response);
      }),
      function (err) {
        cb(err);
      };
  };

  obj.createOutlet = function (outletData, brandId, cb) {
    var data = {
      ...outletData,
      id: brandId,
    };
    // console.log(data);
    $http
      .post("http://localhost:5000/api/brandAdmin/createOutlet", data)
      .then(function (response) {
        // console.log(response);
        cb(response);
      }),
      function (err) {
        cb(err);
      };
  };

  obj.getOutletsByBrandId = function (id, cb) {
    $http
      .get("http://localhost:5000/api/brandAdmin/getOutlets/" + id)
      .then(function (response) {
        // console.log(response);
        cb(response.data);
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  obj.createOutletAdmin = function (outletAdminData, id, brandId, cb) {
    var data = {
      ...outletAdminData,
      id: id,
      brandId: brandId,
    };
    // console.log(data)
    $http
      .post("http://localhost:5000/api/brandAdmin/createOutletAdmin", data)
      .then(function (response) {
        // console.log(response);
        cb(response);
      }),
      function (err) {
        cb(err);
      };
  };

  obj.getCategoryByBrandId = function (brandId, superCategoryId, cb) {
    var data = {
      brandId,
      superCategoryId,
    };
    $http
      .post("http://localhost:5000/api/brandAdmin/getCategory/", data)
      .then(function (response) {
        // console.log(response);
        cb(response);
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  obj.addCategory = function (
    category,
    brandId,
    superCategoryId,
    superCategoryName,
    cb
  ) {
    var data = {
      ...category,
      brandId,
      superCategoryId,
      superCategoryName,
    };
    // console.log(data)
    $http
      .post("http://localhost:5000/api/brandAdmin/addCategory", data)
      .then(function (response) {
        // console.log(response);
        cb(response);
      }),
      function (err) {
        cb(err);
      };
  };

  obj.getUserById = function (id, cb) {
    $http
      .get("http://localhost:5000/api/employee/getUserById/" + id)
      .then(function (response) {
        // console.log(response);
        cb(response);
      }),
      function (err) {
        // console.log(err);
        cb(err);
      };
  };

  obj.updateAdmin = function (admin, id, cb) {
    var data = {
      ...admin,
      id: id,
    };
    // console.log(data);
    $http
      .put("http://localhost:5000/api/employee/updateUser", data)
      .then(function (response) {
        // console.log(response);
        cb(response);
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  obj.updatePassword = function (admin, id, cb) {
    var data = {
      ...admin,
      id: id,
    };
    $http
      .put("http://localhost:5000/api/employee/updatePassword", data)
      .then(function (response) {
        // console.log(null,response);
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
      });
  };

  obj.getProductsInBrand = function (data, cb) {
    $http
      .post("http://localhost:5000/api/product/getProducts", data)
      .then(function (response) {
        // console.log(response);
        cb(response);
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  obj.updateOutletData = function (data, cb) {
    $http
      .post("http://localhost:5000/api/outlet/updateOutletData", data)
      .then(function (response) {
        cb(response);
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  obj.createOutletAgent = function (data, cb) {
    // console.log(data);
    $http
      .post("http://localhost:5000/api/outletAdmin/createOutletAgent", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
      });
  };

  obj.getOutletAgentPage = function (cb) {
    $http
      .get("http://localhost:5000/api/outletAgent/getOutletAgentPage")
      .then(function (response) {
        // console.log(response)
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err);
        cb(err, null);
      });
  };

  obj.addSuperCategory = function (superCategory, brandId, cb) {
    var data = {
      ...superCategory,
      brandId,
    };
    $http
      .post("http://localhost:5000/api/brandAdmin/addSuperCategory", data)
      .then(function (response) {
        // console.log(response);
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  obj.getSuperCategoryByBrandId = function (id, cb) {
    console.log(id);
    $http
      .get("http://localhost:5000/api/brandAdmin/getSuperCategory/" + id)
      .then(function (response) {
        // console.log(response);
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
      });
  };

  obj.getCategories = function (outletId, cb) {
    console.log(outletId);
    $http
      .get("http://localhost:5000/api/outletAgent/getCategories/" + outletId)
      .then(function (response) {
        // console.log(response);
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
      });
  };

  obj.placeOrder = function (customer, cart, orderNo, outletId, cb) {
    var data = {
      ...customer,
      item: cart,
      orderId: orderNo,
      outletId,
    };

    $http
      .post("http://localhost:5000/api/order/createOrder", data)
      .then(function (response) {
        // console.log(response);
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  return obj;
});
