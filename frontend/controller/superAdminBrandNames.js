///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminBrandNamesController",["$scope","$http","$location","apiHandler","$rootScope","$state",function($scope,$http,$location,apiHandler,$rootScope,$state){
    // if($rootScope.admin!==undefined){
    //     apiHandler.getBrands(function(result){
    //         if(result && result.status===200){
    //             $scope.brands=result.data;

    //         }
    //     });
    // }else{
       
    // }
    $scope.isAccess=false;
    apiHandler.getAdminPage(function(result){
        if(result && result.status===200){
            // $scope.btnText="Create";
            $scope.isAccess=true;
            
        }else{
            $location.path('login')
        }
    });

   
    $scope.btnText="Add Admin"
    
    apiHandler.getBrands(function(result){
        if(result && result.status===200){
            $scope.brands=result.data;

        }
    });

    $scope.setBrandId=function(brandId){
        $scope.admin = {
            brandId:brandId,
        }
    }

    $scope.createBrandAdmin=function($event){
        $event.preventDefault();
        
       
        console.log($scope.admin);
        apiHandler.postAddBrandAdmin($scope.admin,function(response){
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
    $scope.setData=function(brandName,brandId){
        $scope.data={
            brandName:brandName,
            _id:brandId
        }
    }
    $scope.editBrand=function($event){
        $event.preventDefault();
        console.log($scope.data);
    }
}])