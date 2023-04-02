///<reference path="../module/module.js"/>

app.service("brandAdminDashBoardApi", function ($http) {
  this.getBasicData = function (id, cb) {
    $http
      .get("http://localhost:5000/api/brandAdmin/getBasicData/" + id)
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };
  this.fetchOutletGraphData = function (id, cb) {
    $http
      .get("http://localhost:5000/api/brandAdmin/getOutletGraphData/" + id)
      .then(function (response) {
        cb(null, response);
      }),
      function (err) {
        cb(err, null);
      };
  };

  this.getGraphData = function (brandId, month, year, cb) {
    $http
      .get(
        "http://localhost:5000/api/brandAdmin/getGraphData?id=" +
          brandId +
          "&month=" +
          month +
          "&year=" +
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
