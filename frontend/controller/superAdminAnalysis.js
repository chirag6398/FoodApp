///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminAnalysisController", [
  "$scope",
  "$http",
  "$location",
  "adminApi",
  "$rootScope",
  function ($scope, $http, $location, adminApi, $rootScope) {
    // adminApi.getAdminPage();
    $rootScope.$on("passData", function (err, data) {
      console.log(data);
    });
  },
]);
