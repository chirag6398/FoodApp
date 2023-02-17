///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
}]);

app.controller("categoryProductController",["$scope","$http","$location","apiHandler","$stateParams",function($scope,$http,$location,apiHandler,$stateParams){
    // console.log($stateParams.id)
    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.brandName;
            $scope.brandId=result.data._id;
            $scope.categoryId=$stateParams.id;
            // apiHandler.getProductsByCategoryId(result.data._id,function(result){
            //     console.log(result.data);
            //     $scope.categories=result.data;
            // })

            
        }else{
            $location.path('login')
        }
    });
    $scope.btnText="Add product";
    $scope.product={};
    $scope.createProduct=function($event){
        $event.preventDefault();
        var data={
            ...$scope.product,
            categoryId:$scope.categoryId,
            brandId:$scope.brandId
        }
        console.log(data);

    }
}])


// http://127.0.0.1:5501/frontend/index.html#/brandcategoryproduct/63ef2809fb24d4a0398d9a94

