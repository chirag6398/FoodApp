///<reference path="../module/module.js"/>

app.factory("adminApi", function ($http, $rootScope) {
  var obj = {};

  var config = {
    headers: {
      Authorization: window.localStorage.getItem("Authorization"),
    },
  };

  obj.getBrand = function (id, cb) {
    $http
      .get("http://localhost:5000/api/brand/getBrand/" + id, config)
      .then(function (response) {
        cb(null, response.data);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.changeLogo = function (data, cb) {
    $http
      .post("http://localhost:5000/api/brand/changeLogo", data, {
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
      .post("http://localhost:5000/api/brand/createBrand", data, {
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
      .get("http://localhost:5000/api/superAdmin/getAdminPage", config)
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
        "http://localhost:5000/api/brand/getBrands/" +
          data.limit +
          "/" +
          data.page,
        config
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
      .post("http://localhost:5000/api/superAdmin/addBrandAdmin", data, config)
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
      .get("http://localhost:5000/api/employee/getUserById/" + id, config)
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
      .put("http://localhost:5000/api/employee/updateUser", data, config)
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
      .put("http://localhost:5000/api/employee/updatePassword", data, config)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getSuperCategories = function (cb) {
    $http
      .get("http://localhost:5000/api/superAdmin/getSuperCategory", config)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getOutlets = function (filter, limit, page, cb) {
    $http
      .get(
        "http://localhost:5000/api/superAdmin/getOutlets?brandName=" +
          filter.brandName +
          "&email=" +
          filter.email +
          "&pageNo=" +
          page +
          "&limit=" +
          limit +
          "&number=" +
          filter.number,
        config
      )
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
      .post("http://localhost:5000/api/brand/updateBrandName", data, config)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.updateLocation = function (data, cb) {
    $http
      .post("http://localhost:5000/api/superAdmin/updateLocation", data, config)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.updateContactInfo = function (data, cb) {
    $http
      .post(
        "http://localhost:5000/api/superAdmin/updateContactInfo",
        data,
        config
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.deactivateBrand = function (brandId, cb) {
    console.log(brandId);
    $http
      .put(
        "http://localhost:5000/api/brand/deactivateBrand",
        { brandId },
        config
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.activateBrand = function (brandId, cb) {
    console.log(brandId);
    $http
      .put("http://localhost:5000/api/brand/activateBrand", { brandId }, config)
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
      .post("http://localhost:5000/api/brand/deleteBrand", { brandId }, config)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.getUsers = function (filter, limit, pageNo, cb) {
    $http
      .get(
        "http://localhost:5000/api/employee/getUsers?brandName=" +
          filter.brandName +
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
        cb(err, null);
      });
  };
  obj.searchBrandBySearchText = function (searchText, cb) {
    $http
      .get(
        "http://localhost:5000/api/brand/searchBrandBySearchText/" + searchText,
        config
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.searchOutletBySearchText = function (searchText, cb) {
    $http
      .get(
        "http://localhost:5000/api/outlet/searchOutletBySearchText/" +
          searchText,
        config
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.searchDashBoardBrandBySearchText = function (searchText, cb) {
    $http
      .get(
        "http://localhost:5000/api/superAdmin/searchDashBoardBrandBySearchText/" +
          searchText,
        config
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.searchUserBySearchText = function (searchText, cb) {
    $http
      .get(
        "http://localhost:5000/api/employee/searchUserBySearchText/" +
          searchText
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
