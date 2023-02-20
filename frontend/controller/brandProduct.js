

///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("brandProductsController",["$scope","$http","$location","apiHandler","$stateParams","$rootScope",function($scope,$http,$location,apiHandler,$stateParams,$rootScope){
    
    $scope.brandId=$stateParams.id;
    console.log($rootScope.outletId);
    apiHandler.getOutletAdminPage(function(result){
        console.log(result);
        $scope.outletName=result.data.outletData.outletName;

        $rootScope.outletId=result.data.outletData._id;
        $scope.brandId=result.data.brandId;

        
    });

    apiHandler.getBrandOutletProducts({brandId:$scope.brandId,outletId:$rootScope.outletId},function(result){
        $scope.categories=result.data;

    })

    $scope.getProducts=function(id){
        apiHandler.getProductByCategory({brandId:$scope.brandId,categoryId:id,outletId:$rootScope.outletId},function(result){
            console.log(result);
            $scope.products=result.data;
        })
    }

    $scope.addProduct=function(product){

        apiHandler.addProductToOutlet(product,$rootScope.outletId,function(err,result){
            console.log(result);
            console.log(err);
        })
    }
   

}])