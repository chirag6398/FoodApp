///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminAnalysisController",["$scope","$http","$location","apiHandler","$rootScope",function($scope,$http,$location,apiHandler,$rootScope){
    // apiHandler.getAdminPage();
    $rootScope.$on('passData',function(err,data){
        console.log(data);
    });
}])