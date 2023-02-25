///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminAnalysisController",["$scope","$http","$location","apiHandler","$rootScope",function($scope,$http,$location,apiHandler,$rootScope){
    if($rootScope.admin!==undefined){
       
    }else{
        $location.path('login');
    }
}])