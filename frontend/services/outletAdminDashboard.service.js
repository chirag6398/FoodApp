///<reference path="../module/module.js"/>

app.service("outletAdminDashBoardApi", function ($http) {
  this.getBasicData = function (id, cb) {
    $http
      .get("http://localhost:5000/api/outletAdmin/getBasicData/" + id)
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  this.getOrderActivity = function (month, year, id, cb) {
    $http
      .get(
        "http://localhost:5000/api/outletAdmin/getOrderActivity?id=" +
          id +
          "&month=" +
          month +
          "&year=" +
          year
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
  this.getGraphData = function (month, year, id, cb) {
    $http
      .get(
        "http://localhost:5000/api/outletAdmin/getOutletSale?id=" +
          id +
          "&month=" +
          month +
          "&year=" +
          year
      )
      .then(function (response) {
        cb(null, response);
      })
      .catch(function (err) {
        cb(err, null);
      });
  };
});
