
///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminUsersController",["$scope","$http","$location","apiHandler","$rootScope","$state",function($scope,$http,$location,apiHandler,$rootScope,$state){
   
    $scope.isAccess=false;
    $rootScope.$on('passData',function(event,data){
        $scope.isAccess=true;
    });
   

    apiHandler.getUsers(function(err,result){
        if(result){
            console.log(result)
            $scope.users=result.data;

        }
    })

   
    
}])