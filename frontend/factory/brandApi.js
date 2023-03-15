///<reference path="../module/module.js"/>

app.factory("brandApi", function ($http, $rootScope) {
  var obj = {};

  obj.getBrandAdminPage = function () {
    $http
      .get("http://localhost:5000/api/brandAdmin/getBrandAdminPage", {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        $rootScope.$emit("passData", response);
      })
      .catch(function (err) {
        $rootScope.$emit("notEligible", {
          status: 401,
          message: "unauthorized user",
        });
        // cb({ status: 401, message: "unauthorized user" }, null);
      });
  };
  obj.getOutlet = function (data, cb) {
    $http
      .get("http://localhost:5000/api/brandAdmin/getOutlet/" + data._id, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb({ status: 401, message: "unauthorized user" }, null);
      });
  };

  obj.createOutlet = function (outletData, brandId, cb) {
    var data = {
      ...outletData,
      id: brandId,
    };

    $http
      .post("http://localhost:5000/api/brandAdmin/createOutlet", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        // console.log(response);
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  obj.getOutletsByBrandId = function (id, cb) {
    console.log(id);
    $http
      .get("http://localhost:5000/api/brandAdmin/getOutlets/" + id, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        console.log(response);
        cb(null, response.data);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.createOutletAdmin = function (
    outletAdminData,
    outletId,
    outletName,
    outlateLocation,
    outletType,
    brandId,
    brandName,
    cb
  ) {
    var data = {
      ...outletAdminData,
      outletId,
      brandId,
      outletName,
      outlateLocation,
      brandName,
      outletType,
    };
    console.log(data);
    $http
      .post("http://localhost:5000/api/brandAdmin/createOutletAdmin", data, {
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

  obj.updateOutletData = function (data, cb) {
    $http
      .post("http://localhost:5000/api/outlet/updateOutletData", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(response, null);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.addSuperCategory = function (data, cb) {
    $http
      .post("http://localhost:5000/api/brandAdmin/addSuperCategory", data, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  obj.getSuperCategoryByBrandId = function (brandId, cb) {
    console.log(brandId);
    $http
      .get("http://localhost:5000/api/brandAdmin/getSuperCategory/" + brandId, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
      });
  };

  obj.getCategoryByBrandId = function (brandId, superCategoryId, cb) {
    var data = {
      brandId,
      superCategoryId,
    };
    $http
      .post("http://localhost:5000/api/brandAdmin/getCategory/", data, {
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

  obj.addCategory = function (data, cb) {
    $http
      .post("http://localhost:5000/api/brandAdmin/addCategory", data, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  obj.getProductsInBrand = function (data, cb) {
    $http
      .post("http://localhost:5000/api/product/getProducts", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        // console.log(response);
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err);
        cb(err, null);
      });
  };

  obj.getBrandUsers = function (id, cb) {
    $http
      .get("http://localhost:5000/api/brandAdmin/getBrandUsers/" + id, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        // console.log(response);
        cb(null, response);
      }),
      function (err) {
        // console.log(err);
        cb(err, null);
      };
  };

  obj.getSuperCategory = function (id, cb) {
    console.log(id);
    $http
      .get("http://localhost:5000/api/product/getSuperCategory/" + id, {
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

  obj.addProduct = function (data, cb) {
    $http
      .post("http://localhost:5000/api/product/addProduct", data, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then(function (result) {
        cb(null, result);
      })
      .catch(function (error) {
        console.log(error);
        cb(error, null);
      });
  };

  obj.updateOutletName = function (data, cb) {
    console.log(data);
    $http
      .post("http://localhost:5000/api/brandAdmin/updateOutletName", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        // console.log(null,response);
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
      });
  };

  obj.updateLocation = function (data, cb) {
    $http
      .post("http://localhost:5000/api/brandAdmin/updateLocation", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        // console.log(null,response);
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
      });
  };

  obj.updateContactInfo = function (data, cb) {
    $http
      .post("http://localhost:5000/api/brandAdmin/updateContactInfo", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        // console.log(null,response);
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
      });
  };

  obj.getAdmin = function (id, cb) {
    $http
      .get("http://localhost:5000/api/brandAdmin/getAdmin/" + id, {
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
    // console.log(data);
    $http
      .put("http://localhost:5000/api/employee/updateUser", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        // console.log(response);
        cb(response);
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  obj.updatePassword = function (password, id, cb) {
    var data = {
      password: password,
      id: id,
    };
    $http
      .put("http://localhost:5000/api/employee/updatePassword", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        // console.log(null,response);
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
      });
  };

  return obj;
});
