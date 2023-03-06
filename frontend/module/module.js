// /<reference path="../services/"/>

var app = angular.module("myModule", ["ui.router"]);

app.controller("mainController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    // $location.path('login')
  },
]);
