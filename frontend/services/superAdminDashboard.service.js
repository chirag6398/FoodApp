///<reference path="../module/module.js"/>

app.service("superAdminDashBoardApi", function ($http) {
  this.getBasicData = function (cb) {
    $http
      .get("http://localhost:5000/api/superAdmin/getBasicData")
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  this.fetchBrandGraphData = function (id, cb) {
    $http
      .get("http://localhost:5000/api/superAdmin/getBrandGraphData/" + id)
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  this.fetchOutletGraphData = function (id, cb) {
    $http
      .get("http://localhost:5000/api/superAdmin/getOutletGraphData/" + id)
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  this.getDataOfTopTwoBrands = function (month, year, cb) {
    $http
      .get(
        "http://localhost:5000/api/superAdmin/getDataOfTopTwoBrands/" +
          month +
          "/" +
          year
      )
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };
});
