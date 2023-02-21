
///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("outletAdminProductsController",["$scope","$http","$location","apiHandler","$rootScope",function($scope,$http,$location,apiHandler,$rootScope){
//    console.log($rootScope.outletId);
   apiHandler.getOutletAdminPage(function(err,result){
    console.log(result);
    $scope.outletName=result.data.outletData.outletName;

    $rootScope.outletId=result.data.outletData._id;
    $scope.brandId=result.data.brandId;

    apiHandler.getOutletProducts($rootScope.outletId,function(err,result){
        if(result){
            $scope.products=result.data;
        }
        console.log($scope.products)
    });
    
});

    

    $scope.removeProduct=function(product){
        console.log(product,$rootScope.outletId);
        apiHandler.removeOutletProduct(product,$rootScope.outletId,function(err,result){
            console.log(result);
        })
    }

}])