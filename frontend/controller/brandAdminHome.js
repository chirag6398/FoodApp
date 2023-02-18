///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("brandAdminHomeController",["$scope","$http","$location","apiHandler",function($scope,$http,$location,apiHandler){
    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.brandName;
            $scope.brandId=result.data._id;

        }else{
            $location.path('login')
        }
    });
    $scope.btnText="Create Outlet";
    $scope.createOutlet=function($event){
        $event.preventDefault();
        apiHandler.createOutlet($scope.outlet,$scope.brandId,function(result){
            console.log(result);
            
        })
    }
}])