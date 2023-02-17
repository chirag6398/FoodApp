///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
}]);

app.controller("brandAdminCategoryController",["$scope","$http","$location","apiHandler",function($scope,$http,$location,apiHandler){
    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.brandName;
            $scope.brandId=result.data._id;

        }else{
            $location.path('login')
        }
    });
    $scope.btnText="Add Category";
    $scope.addCategory=function($event){
        $event.preventDefault();
        console.log($scope.category)
        apiHandler.addCategory($scope.category,$scope.brandId,function(result){
            console.log(result);
            
        })
    }
}])