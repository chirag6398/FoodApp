// /<reference path="../services/"/>

var app = angular.module("myModule", ["ui.router"]);

app.controller("mainController", [
  "$scope",
  "$http",
  "$state",
  function ($scope, $http, $state) {
    // $location.path('login')
    // $state.go("login");
  },
]);
