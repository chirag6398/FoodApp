///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("outletAdminController",["$scope","$http","$location","outletApi","$rootScope",function($scope,$http,$location,outletApi,$rootScope){
    // $location.path("/outletAdmin/products")
    outletApi.getOutletAdminPage(function(err,result){
        console.log(result);
        $scope.outletName=result.data.outletData.name;

        $rootScope.outletId=result.data.outletData._id;
        $scope.brandId=result.data.brandId;
        
    });

    


}])