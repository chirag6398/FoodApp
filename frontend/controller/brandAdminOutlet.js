///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("brandAdminOutletsController",["$scope","$http","$location","apiHandler",function($scope,$http,$location,apiHandler){
    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.brandName;

            apiHandler.getOutletsByBrandId(result.data._id,function(result){
                // console.log(result.data._id);
                $scope.outlets=result.data;
                // $scope.id=result.data._id;
            })
            
        }else{
            $location.path('login')
        }
    });

    $scope.btnText="Create";
    $scope.admin={};

    $scope.createOutletAdmin=function($event,id){
        $event.preventDefault();
        console.log($scope.admin,id);
        apiHandler.createOutletAdmin($scope.admin,id,function(result){
            console.log(result);
        })
    }

}])