// /<reference path="../services/"/>

var app = angular.module("myModule", ["ui.router", "ngAnimate"]);

app.controller("mainController", [
  "$scope",
  "$location",
  "$state",
  function ($scope, $location, $state) {
    // $location.path("login");
    // $state.go("login");
    // $scope.socket = io("http://localhost:5000");
  },
]);
