///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("outletAdminController",["$scope","$http","$location","apiHandler","$rootScope",function($scope,$http,$location,apiHandler,$rootScope){
    // $location.path("/outletAdmin/products")
    apiHandler.getOutletAdminPage(function(result){
        console.log(result);
        $scope.outletName=result.data.outletData.outletName;

        $rootScope.outletId=result.data.outletData._id;
        $scope.brandId=result.data.brandId;
        
    });

    


}])