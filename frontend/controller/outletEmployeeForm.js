///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("outletEmployeeFormController",["$scope","$http","$location","apiHandler","$rootScope",function($scope,$http,$location,apiHandler,$rootScope){
    
    apiHandler.getOutletAdminPage(function(err,result){
        if(result){
            $scope.outletName=result.data.outletData.outletName;

            $rootScope.outletId=result.data.outletData._id;
            $scope.brandId=result.data.brandId;
        }
        
        
    });

    $scope.btnText="create agent";
    $scope.agent={};

    $scope.createOutletAgent=function($event,brandId){
        $event.preventDefault();
        $scope.btnText="creating...";
        console.log(brandId,$rootScope.outletId,$scope.agent);
        apiHandler.createOutletAgent({...$scope.agent,brandId,outletId:$rootScope.outletId},function(err,result){
            if(result){
                console.log(result);
                $scope.btnText="created";
            }
        })
    }
    


}])