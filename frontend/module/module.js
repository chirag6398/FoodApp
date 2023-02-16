// /<reference path="../services/"/>

var app=angular.module("myModule",["ui.router"]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
}]);

app.controller("mainController",["$scope","$http",function($scope,$http){
    
    $scope.data="hello";
    
    // userHandler.getUser($http,function(data){

        // $scope.data="hello"
    // })


}])