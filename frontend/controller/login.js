///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("loginController",["$scope","$http","$location","apiHandler","$rootScope",function($scope,$http,$location,apiHandler,$rootScope){
    $scope.disabledFlag=false;
    $scope.buttonText="submit";
   
    $scope.submitHandler=function($event){
        $event.preventDefault();
        $scope.disabledFlag=true;
        $scope.buttonText="processing";
        
        apiHandler.postLogin($scope.lgn,function(err,result){
            if(err){
                $scope.buttonText="Retry";
                $scope.disabledFlag=false;
            }else{
                $scope.buttonText="successfull";
                window.localStorage.setItem("Authorization","Bearer "+result.token);
                
                if(result.userType==="superAdmin"){
                    
                    $location.path("superAdmin");
                    
                }else if(result.userType==="brandAdmin"){
                    $location.path("brandadmin");
                }else if(result.userType==="outletAdmin"){
                    $rootScope.admin=result.admin;
                    $location.path("outletAdmin");
                }else if(result.userType==="outletAgent"){
                    $location.path("outletAgent");
                }
            }
            
        })
       
    }
}])