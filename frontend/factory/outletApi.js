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

  return obj;
});
