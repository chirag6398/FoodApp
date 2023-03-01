///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminBrandNamesController",["$scope","$http","$location","apiHandler","$rootScope","$state","adminApi",function($scope,$http,$location,apiHandler,$rootScope,$state,adminApi){
    
    $scope.isAccess=false;
    // apiHandler.getAdminPage(function(result){
    //     if(result && result.status===200){
           
    //         $scope.isAccess=true;
            
    //     }else{
    //         $location.path('login')
    //     }
    // });

    $rootScope.$on('passData',function(err,data){
        console.log(data);
    });
   
    $scope.btnText="Add Admin"
    
    adminApi.getBrands(function(err,result){
        if(result){
            $scope.brands=result.data;
            console.log($scope.brands);

        }
    });

    $scope.admin={};

   

    $scope.createBrandAdmin=function($event,brandId,brandName){
        $event.preventDefault();
        $scope.btnText="processing"
       
        console.log($scope.admin);

        adminApi.postAddBrandAdmin($scope.admin,brandId,brandName,function(err,result){
            if(result){
                console.log(result);
                $scope.btnText="successful"
            }
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
    $scope.setData=function(brandName,brandId){
        $scope.data={
            name:brandName,
            _id:brandId
        }
    }

    $scope.editBrand=function($event){
        $event.preventDefault();
        console.log($scope.data);
    }

    $scope.deleteBrand=function(brandId){
        apiHandler.deleteBrand(brandId,function(err,result){
            if(result){
                console.log(result);
            }
        })
    }
}])