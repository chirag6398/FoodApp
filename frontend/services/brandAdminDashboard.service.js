///<reference path="../module/module.js"/>

app.service("brandAdminDashBoardApi", function ($http) {
  this.getBasicData = function (id, cb) {
    $http
      .get(
        "http://localhost:5000/api/brandAdmin/getBasicData/" + id,

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
        "http://localhost:5000/api/brandAdmin/getOutletGraphData/" + id,

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

  this.getGraphData = function (brandId, month, cb) {
    $http
      .get(
        "http://localhost:5000/api/brandAdmin/getGraphData?id=" +
          brandId +
          "&month=" +
          month,
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
