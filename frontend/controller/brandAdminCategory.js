///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("brandAdminCategoryController",["$scope","$http","$location","brandApi",function($scope,$http,$location,brandApi){
    brandApi.getBrandAdminPage(function(err,result){
        if(result){
            $scope.brandName=result.data.name;
            $scope.brandId=result.data._id;

            

        }else{
            $location.path('login')
        }
    });
    $scope.btnText="Add Super Category";
    $scope.addCategory=function($event){
        $event.preventDefault();
        $scope.btnText="adding...";

        
        
        brandApi.addSuperCategory({...$scope.category,brand:{_id:$scope.brandId,name:$scope.brandName}},function(err,result){
            
            if(result){
                console.log(result)
                $scope.btnText="added";
            }else{
                $scope.btnText="try later";
            }
            
        })
    }
}])