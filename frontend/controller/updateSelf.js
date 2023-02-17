///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("updateSelfController",["$scope","$http","$location","apiHandler","$stateParams",function($scope,$http,$location,apiHandler,$stateParams){
    console.log($stateParams.id);
    $scope.adminId=$stateParams.id;
}])