///<reference path="../module/module.js"/>

app.service("outletAdminDashBoardApi", function ($http) {
  this.getBasicData = function (id, cb) {
    $http
      .get(
        "http://localhost:5000/api/outletAdmin/getBasicData/" + id,

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
