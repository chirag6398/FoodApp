///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminController",["$scope","$http","$location","apiHandler","$state","$rootScope",function($scope,$http,$location,apiHandler,$state,$rootScope){
    console.log("login admin",$rootScope.admin);
    if($rootScope.admin!==undefined){
        $scope.btnText="Create";
            
        $rootScope.superAdmin=$rootScope.admin.user;
        $scope.superAdminId=$rootScope.admin._id;
    }else{
        $location.path('login')
    }

    // apiHandler.getAdminPage(function(result){
    //     if(result.status===200){
            
    //     }else{
           
           
            
    //     }
    // });
   

    $scope.createBrand=function($event){
        $event.preventDefault();
        $scope.btnText="creating...";
        
        apiHandler.createBrand($scope.brand,function(result){
            console.log("result",result);
            if(result.status===200){
                $scope.btnText="created";
                
            }
          
        })
    }
}])