///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("outletAgentController",["$scope","$http","$location","apiHandler",function($scope,$http,$location,apiHandler){
    apiHandler.getOutletAgentPage(function(err,result){
        if(result){
            console.log(result);
            $scope.outletId=result.data.outletId;

            apiHandler.getOutletProducts($scope.outletId,function(err,result){
                console.log(result);
                $scope.products=result.data;
            })
        }
    })
}])