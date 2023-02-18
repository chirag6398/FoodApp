///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("loginController",["$scope","$http","$location","apiHandler","$rootScope",function($scope,$http,$location,apiHandler,$rootScope){
    $scope.disabledFlag=false;
    $scope.buttonText="submit";

    
   
    $scope.submitHandler=function($event){
        $event.preventDefault();

        console.log($scope.lgn);
        $scope.disabledFlag=true;
        $scope.buttonText="processing";
        apiHandler.postLogin($scope.lgn,function(result){
            
            if(result && result.status===200){
                $scope.buttonText="successfull";
                window.localStorage.setItem("Authorization","Bearer "+result.token);
                console.log(result);
                if(result.userType==="superAdmin"){
                    
                    $location.path("superAdmin");
                    
                }else if(result.userType==="brandAdmin"){
                    $location.path("brandadmin");
                }else if(result.userType==="outletAdmin"){
                    $rootScope.admin=result.admin;
                    $location.path("outletAdmin");
                }
            }else{
                $scope.buttonText="Retry";
                $scope.disabledFlag=false
            }
        })
       
    }
}])