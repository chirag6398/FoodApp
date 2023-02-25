///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminAnalysisController",["$scope","$http","$location","apiHandler","$rootScope",function($scope,$http,$location,apiHandler,$rootScope){
    apiHandler.getAdminPage(function(result){
        if(result.status===200){
            $scope.btnText="Create";
           
        }else{
            
            $location.path('login')
            
        }
    });
}])