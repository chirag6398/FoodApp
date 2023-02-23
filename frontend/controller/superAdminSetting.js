///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>


app.controller("superAdminSettingController",["$scope","$http","$location","apiHandler","$stateParams",function($scope,$http,$location,apiHandler,$stateParams){
    console.log($stateParams.id);
    $scope.adminId=$stateParams.id;
}])