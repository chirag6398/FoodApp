///<reference path="../module/module.js"/>

app.service("setAdminData", function ($http, $rootScope) {
  var adminCredentials = null;
  this.setAdminData = function (data) {
    console.log(data);
    adminCredentials = data;
  };

  this.getAdminData = function () {
    return adminCredentials;
  };
});
