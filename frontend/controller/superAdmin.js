///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminController",["$scope","$http","$location","apiHandler","$state","$rootScope",function($scope,$http,$location,apiHandler,$state,$rootScope){
    apiHandler.getAdminPage(function(result){
        if(result.status===200){
            $scope.btnText="Create";
            // console.log(result);
            $rootScope.superAdmin=result.data.user;
            $scope.superAdminId=result.data.user._id;
        }else{
           
            $location.path('login')
            
        }
    });
   

    $scope.createBrand=function($event){
        $event.preventDefault();
        $scope.btnText="creating...";
        // console.log($scope.brand);
        apiHandler.createBrand($scope.brand,function(result){
            console.log("result",result);
            if(result.status===200){
                $scope.btnText="created";
                
            }
          
        })
    }
}])