///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("superAdminController",["$scope","$http","$location","apiHandler",function($scope,$http,$location,apiHandler){
    apiHandler.getAdminPage(function(result){
        if(result.status===200){
            $scope.btnText="Create";
            console.log(result);
            $scope.superAdminId=result.data.user._id;
        }else{
            // window.location.reload();
            $location.path('login')
            // console.log(result);
        }
    });

    $scope.createBrand=function($event){
        $event.preventDefault();
        $scope.btnText="creating...";
        console.log($scope.brand);
        apiHandler.createBrand($scope.brand,function(result){
            console.log("result",result);
            if(result.status===200){
                $scope.btnText="created";
                
            }
            // console.log("error",error);
        })
    }
}])