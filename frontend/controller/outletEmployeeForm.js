///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("outletEmployeeFormController",["$scope","$http","$location","apiHandler","outletApi","$rootScope",function($scope,$http,$location,apiHandler,outletApi,$rootScope){
    
    // outletApi.getOutletAdminPage(function(err,result){
    //     if(result){
    //         console.log(result.data);
    //         $scope.outletData=result.data.outletData;
    //     }
        
        
    // });
    $rootScope.$on('passData',function(err,data){
        if(data){
            $scope.outletData=data.data.outletData;
                
        }
    });

    $scope.btnText="create agent";
    $scope.agent={};

    $scope.createOutletAgent=function($event,brandId){
        $event.preventDefault();
        $scope.btnText="creating...";
       
        outletApi.createOutletAgent({...$scope.agent,brand:$scope.outletData.brand,outlet:{_id:$scope.outletData._id,type:$scope.outletData.type,name:$scope.outletData.name}},function(err,result){
            if(result){
                console.log(result);
                $scope.btnText="created";
            }
        })
    }
    


}])