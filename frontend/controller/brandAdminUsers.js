///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("brandAdminUsersController",["$scope","$http","$location","apiHandler",function($scope,$http,$location,apiHandler){
    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.name;
            $scope.brandId=result.data._id;

        }else{
            $location.path('login')
        }
    });
    
}])