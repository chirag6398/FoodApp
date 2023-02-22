
///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("subCategoryController",["$scope","$http","$location","apiHandler","$rootScope","$stateParams",function($scope,$http,$location,apiHandler,$rootScope,$stateParams){
    //    console.log($rootScope.outletId);

     apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.brandName;
            $scope.brandId=result.data._id;
            console.log(result.data);

            apiHandler.getCategoryByBrandId(result.data._id,$stateParams.id,function(result){
                console.log(result.data);
                $scope.categories=result.data;
            })

            
        }else{
            $location.path('login')
        }
    });
    $scope.category={};
    $scope.btnText="Add Sub Category";
    $scope.addCategory=function($event){
        $event.preventDefault();
        $scope.btnText="adding...";

        console.log($scope.category,$stateParams.id,$stateParams.name)
        apiHandler.addCategory($scope.category,$scope.brandId,$stateParams.id,$stateParams.name,function(result){
            console.log(result);
            
        })
        
    }
}])
    
