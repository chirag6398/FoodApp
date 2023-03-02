///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("outletAdminController",["$scope","$http","$location","outletApi","$rootScope",function($scope,$http,$location,outletApi,$rootScope){

    outletApi.getOutletAdminPage();

    

    $rootScope.$on('passData',function(err,data){
        if(data){
            console.log(data);
            $scope.outletName=data.data.outletData.name;

            $rootScope.outletId=data.data.outletData._id;
            $scope.brandId=data.data.brandId;
            $scope.brandLogo=data.data.outletData.brand.logo;
                
        }
    });

    $rootScope.$on('notEligible',function(err,isEligible){
        if(!isEligible){
            $location.path('login');
        }
    })

    


}])