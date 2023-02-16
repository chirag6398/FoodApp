///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
}]);

app.controller("brandAdminProductController",["$scope","$http","$location","apiHandler",function($scope,$http,$location,apiHandler){
    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.brandName;
            
        }else{
            $location.path('login')
        }
    });
}])