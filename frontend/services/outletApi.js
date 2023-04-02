///<reference path="../module/module.js"/>

app.service("outletApi", function ($http, $rootScope) {
  var obj = {};

  obj.getOutletAdminPage = function () {
    $http
      .get("http://localhost:5000/api/outletAdmin/getAdminPage")
      .then(function (response) {
        $rootScope.$emit("passData", response);
      })
      .catch(function (err) {
        $rootScope.$emit("notEligible", false);
      });
  };

  obj.createOutletAgent = function (data, cb) {
    console.log(data);
    $http
      .post("http://localhost:5000/api/outletAdmin/createOutletAgent", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
        cb(err, null);
      });
  };

  obj.addTax = function (data, cb) {
    console.log(data);
    $http
      .post("http://localhost:5000/api/outlet/addTax", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.getTaxes = function (id, cb) {
    $http
      .get("http://localhost:5000/api/outlet/getTaxes/" + id)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.saveTableView = function (data, cb) {
    $http
      .post("http://localhost:5000/api/outlet/saveTableView", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getOutletAgentEmployees = function (id, cb) {
    $http
      .get("http://localhost:5000/api/employee/getOutletAgentEmployees/" + id)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getSuperCategories = function (id, cb) {
    $http
      .get("http://localhost:5000/api/outletAdmin/getSuperCategories/" + id)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  obj.getSubCategory = function (id, cb) {
    $http
      .get("http://localhost:5000/api/outletAdmin/getSubCategories/" + id)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getProductByCategory = function (data, cb) {
    $http
      .post("http://localhost:5000/api/outlet/categoryProduct", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.addProductToOutlet = function (product, outletId, cb) {
    var data = {
      ...product,
      outletId,
    };

    $http
      .post("http://localhost:5000/api/outlet/addProductToOutlet", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getOutletProducts = function (id, cb) {
    $http
      .get("http://localhost:5000/api/outlet/getProduct/" + id)
      .then(function (response) {
        // console.log(response)
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err);
        cb(err, null);
      });
  };

  obj.removeOutletProduct = function (product, outletId, cb) {
    var data = {
      ...product,
      outletId,
    };

    $http
      .post("http://localhost:5000/api/outlet/removeOutletProduct", data)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.removeTax = function (_id, taxId, cb) {
    $http
      .put(
        "http://localhost:5000/api/outletAdmin/removeTax?_id=" +
          _id +
          "&taxId=" +
          taxId
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.updateTax = function (_id, tax, cb) {
    $http
      .put(
        "http://localhost:5000/api/outletAdmin/updateTax?_id=" +
          _id +
          "&taxId=" +
          tax._id +
          "&taxName=" +
          tax.name +
          "&taxPerCent=" +
          tax.percent
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };

  obj.getUsers = function (id, limit, page, filter, cb) {
    $http
      .get(
        "http://localhost:5000/api/outletAdmin/getUsers?id=" +
          id +
          "&page=" +
          page +
          "&limit=" +
          limit +
          "&userType=" +
          filter.userType +
          "&email=" +
          filter.email +
          "&number=" +
          filter.number
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
