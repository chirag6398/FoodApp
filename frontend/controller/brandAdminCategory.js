///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("brandAdminCategoryController",["$scope","$http","$location","apiHandler",function($scope,$http,$location,apiHandler){
    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
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

        console.log($scope.category)
        // apiHandler.addCategory($scope.category,$scope.brandId,function(result){
        //     console.log(result);
            
        // })
        apiHandler.addSuperCategory($scope.category,$scope.brandId,function(err,result){
            
            if(result){
                $scope.btnText="added";
            }else{
                $scope.btnText="try later";
            }
            
        })
    }
}])