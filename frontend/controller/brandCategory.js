///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("brandCategoryController",["$scope","$http","$location","brandApi",function($scope,$http,$location,brandApi){
    $scope.isLoading=true;
    brandApi.getBrandAdminPage(function(err,result){
        
        if(result ){
            $scope.brandName=result.data.name;

            brandApi.getSuperCategoryByBrandId(result.data._id,function(err,result){
                console.log(result);
                
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