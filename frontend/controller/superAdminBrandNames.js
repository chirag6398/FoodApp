///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("superAdminBrandNamesController",["$scope","$http","$location","apiHandler","$rootScope","$state",function($scope,$http,$location,apiHandler,$rootScope,$state){
    apiHandler.getAdminPage(function(result){
        if(result && result.status===200){
            // $scope.btnText="Create";
            apiHandler.getBrands(function(result){
                if(result && result.status===200){
                    $scope.brands=result.data;

                }
            });
            
        }else{
            $location.path('login')
        }
    });

    // $rootScope.parentState=($state.current.name==="superAdmin")?true:false;

    $scope.btnText="Add Admin"
    
    $scope.admin = {

    }

    $scope.createBrandAdmin=function($event,id){
        $event.preventDefault();
        // console.log($scope.firstName);
        $scope.brandId=id;
        // console.log(id);
        // console.log($scope.admin);
        apiHandler.postAddBrandAdmin({admin:$scope.admin,id:id},function(response){
            console.log(response);
        })
    }

    $scope.deactivateBrand=function(brandId){
        console.log(brandId);
        apiHandler.deactivateBrand(brandId,function(result){
            console.log(result);
        })
    }

    $scope.activateBrand=function(brandId){
        console.log(brandId);
        apiHandler.activateBrand(brandId,function(result){
            console.log(result);
        })
    }
    
}])