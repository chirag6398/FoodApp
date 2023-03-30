// /<reference path="../services/"/>

var app = angular.module("myModule", ["ui.router", "ngAnimate"]);

app.controller("mainController", [
  "$scope",
  "socketService",
  "$state",
  function ($scope, socketService, $state) {
    // $location.path("login");
    // $state.go("login");
    // $scope.socket = io("http://localhost:5000");
    socketService.socketConnect();
  },
]);
