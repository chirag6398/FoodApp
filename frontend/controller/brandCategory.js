///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("brandCategoryController",["$scope","$http","$location","apiHandler",function($scope,$http,$location,apiHandler){
    $scope.isLoading=true;
    apiHandler.getBrandAdminPage(function(result){
        
        if(result && result.status===200){
            $scope.brandName=result.data.name;

            apiHandler.getSuperCategoryByBrandId(result.data._id,function(err,result){
                // console.log(result);
                
                if(result){
                    $scope.superCategories=result.data;
        
                    $scope.isLoading=false; 
                }else{
                    alert("plz try later some error has occured")
                }
            });
            
            
            
        }else{
            $location.path('login')
        }
    });

    

    $scope.btnText="Add product"
}])