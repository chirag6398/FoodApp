///<reference path="../module/module.js"/>

app.factory("brandApi", function ($http, $rootScope, setAdminData) {
  var obj = {};

  obj.searchUserBySearchText = function (searchText, id, cb) {
    $http
      .get(
        "http://localhost:5000/api/employee/searchUserBySearchTextAndBrandId?searchText=" +
          searchText +
          "&id=" +
          id
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getBrandAdminPage = function () {
    $http
      .get("http://localhost:5000/api/brandAdmin/getBrandAdminPage", {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        $rootScope.$emit("passData", response);
        setAdminData.setAdminData(response);
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

  obj.createOutlet = function (outletData, brandId, brandName, brandLogo, cb) {
    var data = {
      ...outletData,
      brandId: brandId,
      brandName,
      brandLogo,
    };

    $http
      .post("http://localhost:5000/api/brandAdmin/createOutlet", data, {
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
    // outlateLocation,
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
      // outlateLocation,
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
      .put("http://localhost:5000/api/outlet/updateOutletData", data, {
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

  obj.updateSuperCategory = function (data, cb) {
    $http
      .post("http://localhost:5000/api/brandAdmin/updateSuperCategory", data, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
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
        cb(err, null);
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
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getBrandUsers = function (id, filter, limit, pageNo, cb) {
    $http
      .get(
        "http://localhost:5000/api/brandAdmin/getBrandUsers?id=" +
          id +
          "&userType=" +
          filter.userType +
          "&email=" +
          filter.email +
          "&number=" +
          filter.number +
          "&limit=" +
          limit +
          "&pageNo=" +
          pageNo,
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
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
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
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
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
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
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
        cb(response);
      })
      .catch(function (err) {});
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
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.togleOutlet = function (outletId, cb) {
    $http
      .put(
        "http://localhost:5000/api/outlet/togleOutlet",
        { outletId },
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

  obj.deleteOutlet = function (outletId, cb) {
    $http
      .put(
        "http://localhost:5000/api/outlet/deleteOutlet",
        { outletId },
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

  obj.updateProduct = function (data, cb) {
    $http
      .post("http://localhost:5000/api/product/updateProduct", data, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then(
        function (response) {
          cb(null, response.data);
        },
        function (error) {
          cb(err, null);
        }
      );
  };

  return obj;
});
