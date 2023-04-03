///<reference path="../module/module.js"/>

app.service("brandApi", function ($http, $rootScope, setAdminData) {
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
        cb(err.data, null);
      });
  };

  obj.getBrandAdminPage = function () {
    $http
      .get("http://localhost:5000/api/brandAdmin/getBrandAdminPage")
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
      .get("http://localhost:5000/api/brandAdmin/getOutlet/" + data._id)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
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
      .post("http://localhost:5000/api/brandAdmin/createOutlet", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.getOutletsByBrandId = function (id, limit, page, cb) {
    console.log(id);
    $http
      .get(
        "http://localhost:5000/api/brandAdmin/getOutlets?id=" +
          id +
          "&limit=" +
          limit +
          "&page=" +
          page
      )
      .then(function (response) {
        console.log(response);
        cb(null, response.data);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.searchOutletBySearchText = function (text, id, cb) {
    $http
      .get(
        "http://localhost:5000/api/brandAdmin/searchOutletBySearchText?id=" +
          id +
          "&text=" +
          text
      )
      .then(function (response) {
        console.log(response);
        cb(null, response.data);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.createOutletAdmin = function (
    outletAdminData,
    outletId,
    outletName,
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
      brandName,
      outletType,
    };
    console.log(data);
    $http
      .post("http://localhost:5000/api/brandAdmin/createOutletAdmin", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.updateOutletData = function (data, cb) {
    $http
      .put("http://localhost:5000/api/outlet/updateOutletData", data)
      .then(function (response) {
        cb(response, null);
      })
      .catch(function (err) {
        cb(err.data, null);
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
      })
      .catch(function (err) {
        console.log(err);
        cb(err.data, null);
      });
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
        cb(err.data, null);
      });
  };

  obj.getSuperCategoryByBrandId = function (brandId, cb) {
    console.log(brandId);
    $http
      .get("http://localhost:5000/api/brandAdmin/getSuperCategory/" + brandId)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.getCategoryByBrandId = function (brandId, superCategoryId, cb) {
    var data = {
      brandId,
      superCategoryId,
    };
    $http
      .post("http://localhost:5000/api/brandAdmin/getCategory/", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
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
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.getProductsInBrand = function (data, cb) {
    $http
      .post("http://localhost:5000/api/product/getProducts", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
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
          pageNo
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.getSuperCategory = function (id, cb) {
    console.log(id);
    $http
      .get("http://localhost:5000/api/product/getSuperCategory/" + id)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
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
      .catch(function (err) {
        console.log(err);
        cb(err.data, null);
      });
  };

  obj.updateOutletName = function (data, cb) {
    console.log(data);
    $http
      .post("http://localhost:5000/api/brandAdmin/updateOutletName", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.updateLocation = function (data, cb) {
    $http
      .post("http://localhost:5000/api/brandAdmin/updateLocation", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.updateContactInfo = function (data, cb) {
    $http
      .post("http://localhost:5000/api/brandAdmin/updateContactInfo", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.getAdmin = function (id, cb) {
    $http
      .get("http://localhost:5000/api/brandAdmin/getAdmin/" + id)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
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
      .put("http://localhost:5000/api/employee/updatePassword", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.togleOutlet = function (outletId, cb) {
    $http
      .put("http://localhost:5000/api/outlet/togleOutlet", { outletId })
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
  };

  obj.deleteOutlet = function (outletId, cb) {
    $http
      .put("http://localhost:5000/api/outlet/deleteOutlet", { outletId })
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err.data, null);
      });
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
          cb(err.data, null);
        }
      );
  };

  obj.updateCategory = function (formData, cb) {
    $http
      .post("http://localhost:5000/api/brandAdmin/updateCategory", formData, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then(
        function (response) {
          console.log(response.data);
          cb(null, response);
        },
        function (err) {
          console.log(err);
          cb(err.data, null);
        }
      );
  };

  return obj;
});
