
///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminUsersController",["$scope","$http","$location","apiHandler","$rootScope","$state",function($scope,$http,$location,apiHandler,$rootScope,$state){
   
    $scope.isAccess=false;
    apiHandler.getAdminPage(function(result){
        if(result && result.status===200){
            // $scope.btnText="Create";
            $scope.isAccess=true;
            
        }else{
            $location.path('login')
        }
    });

    apiHandler.getUsers(function(err,result){
        if(result){
            console.log(result)
            $scope.users=result.data;

        }
    })

   
    
}])