///<reference path="../module/module.js"/>

app.service("superAdminDashBoardApi", function ($http) {
  this.getBasicData = function (cb) {
    $http
      .get(
        "http://localhost:5000/api/superAdmin/getBasicData",

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

  this.fetchBrandGraphData = function (id, cb) {
    $http
      .get(
        "http://localhost:5000/api/superAdmin/getBrandGraphData/" + id,

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

  this.fetchOutletGraphData = function (id, cb) {
    $http
      .get(
        "http://localhost:5000/api/superAdmin/getOutletGraphData/" + id,

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

  this.getDataOfTopTwoBrands = function (month, cb) {
    $http
      .get(
        "http://localhost:5000/api/superAdmin/getDataOfTopTwoBrands/" + month,

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
});
