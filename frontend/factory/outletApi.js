///<reference path="../module/module.js"/>

app.factory("outletApi", function ($http, $rootScope) {
  var obj = {};

  obj.getOutletAdminPage = function () {
    $http
      .get("http://localhost:5000/api/outletAdmin/getAdminPage", {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
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
      .post("http://localhost:5000/api/outletAdmin/createOutletAgent", data, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        // console.log(err,null);
        cb(err, null);
      });
  };

  obj.addTax = function (data, cb) {
    console.log(data);
    $http
      .post("http://localhost:5000/api/outlet/addTax", data, {
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
  obj.getTaxes = function (id, cb) {
    $http
      .get("http://localhost:5000/api/outlet/getTaxes/" + id, {
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
  obj.saveTableView = function (data, cb) {
    $http
      .post("http://localhost:5000/api/outlet/saveTableView", data, {
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

  obj.getOutletAgentEmployees = function (id, cb) {
    $http
      .get("http://localhost:5000/api/employee/getOutletAgentEmployees/" + id, {
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

  obj.getSuperCategories = function (id, cb) {
    $http
      .get("http://localhost:5000/api/outletAdmin/getSuperCategories/" + id, {
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
  obj.getSubCategory = function (id, cb) {
    $http
      .get("http://localhost:5000/api/outletAdmin/getSubCategories/" + id, {
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

  obj.getProductByCategory = function (data, cb) {
    $http
      .post("http://localhost:5000/api/outlet/categoryProduct", data, {
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

  obj.addProductToOutlet = function (product, outletId, cb) {
    var data = {
      ...product,
      outletId,
    };

    $http
      .post("http://localhost:5000/api/outlet/addProductToOutlet", data, {
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

  obj.getOutletProducts = function (id, cb) {
    $http
      .get("http://localhost:5000/api/outlet/getProduct/" + id, {
        headers: {
          Authorization: window.localStorage.getItem("Authorization"),
        },
      })
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
      .post("http://localhost:5000/api/outlet/removeOutletProduct", data, {
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

  return obj;
});
