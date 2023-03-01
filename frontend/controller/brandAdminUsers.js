///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("brandAdminUsersController",["$scope","$http","$location","brandApi",function($scope,$http,$location,brandApi){
    brandApi.getBrandAdminPage(function(err,result){
        if(result ){
            $scope.brandName=result.data.name;
            $scope.brandId=result.data._id;
            brandApi.getBrandUsers($scope.brandId,function(err,result){
                if(result){
                    console.log(result);
                    $scope.users=result.data
                }
            })

        }else{
            $location.path('login')
        }
    });
   
}])