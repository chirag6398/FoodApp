///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
}]);

app.controller("categoryProductController",["$scope","$http","$location","apiHandler","$stateParams",function($scope,$http,$location,apiHandler,$stateParams){
    console.log($stateParams.id)
    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.brandName;

            // apiHandler.getProductsByCategoryId(result.data._id,function(result){
            //     console.log(result.data);
            //     $scope.categories=result.data;
            // })
            
        }else{
            $location.path('login')
        }
    });
    $scope.btnText="Add product"
}])