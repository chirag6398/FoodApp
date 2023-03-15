///<reference path="../module/module.js"/>

app.factory("adminApi", function ($http, $rootScope) {
  var obj = {};

  obj.getBrand = function (id, cb) {
    $http
      .get("http://localhost:5000/api/superAdmin/getBrand/" + id, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(null, response.data);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.changeLogo = function (data, cb) {
    $http
      .post("http://localhost:5000/api/superAdmin/changeLogo", data, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then(function (response) {
        cb(null, response.data);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.createBrand = function (data, cb) {
    console.log(data);

    $http
      .post("http://localhost:5000/api/superAdmin/createBrand", data, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then(function (response) {
        cb(null, response.data);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getAdminPage = function () {
    $http
      .get("http://localhost:5000/api/superAdmin/getAdminPage", {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        $rootScope.$emit("passData", response.data.user);
      })
      .catch(function (err) {
        $rootScope.$emit("notEligible", false);
      });
  };

  obj.getBrands = function (data, cb) {
    $http
      .get(
        "http://localhost:5000/api/superAdmin/getBrands/" +
          data.limit +
          "/" +
          data.page,
        {
          headers: {
            Authorization: window.localStorage.getItem("Authorization"),
          },
        }
      )
      .then(function (response) {
        cb(null, response.data);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.postAddBrandAdmin = function (admin, brandId, brandName, cb) {
    var data = {
      ...admin,
      brandId,
      brandName,
    };
    console.log(data);
    $http
      .post("http://localhost:5000/api/superAdmin/addBrandAdmin", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        console.log(response);
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getUserById = function (id, cb) {
    $http
      .get("http://localhost:5000/api/employee/getUserById/" + id, {
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
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
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

  obj.getSuperCategories = function (cb) {
    $http
      .get("http://localhost:5000/api/superAdmin/getSuperCategory", {
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

  obj.getOutlets = function (cb) {
    $http
      .get("http://localhost:5000/api/superAdmin/getOutlets", {
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

  obj.updateBrandName = function (data, cb) {
    console.log(data);
    $http
      .post("http://localhost:5000/api/superAdmin/updateBrandName", data, {
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
      .post("http://localhost:5000/api/superAdmin/updateLocation", data, {
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
      .post("http://localhost:5000/api/superAdmin/updateContactInfo", data, {
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

  obj.deactivateBrand = function (brandId, cb) {
    $http
      .post(
        "http://localhost:5000/api/superAdmin/deactivateBrand",
        { brandId },
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
  obj.activateBrand = function (brandId, cb) {
    $http
      .post(
        "http://localhost:5000/api/superAdmin/activateBrand",
        { brandId },
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

  obj.deleteBrand = function (brandId, cb) {
    console.log(brandId);
    $http
      .post(
        "http://localhost:5000/api/superAdmin/deleteBrand",
        { brandId },
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
  obj.getUsers = function (data, cb) {
    $http
      .get(
        "http://localhost:5000/api/employee/getUsers/" +
          data.limit +
          "/" +
          data.page
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.searchBrandBySearchText = function (searchText, cb) {
    $http
      .get(
        "http://localhost:5000/api/superAdmin/searchBrandBySearchText/" +
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

  return obj;
});
