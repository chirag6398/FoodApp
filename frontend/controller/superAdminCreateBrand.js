///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminCreateBrandController",["$scope","$http","$location","adminApi","apiHandler","$state","$rootScope",function($scope,$http,$location,adminApi,apiHandler,$state,$rootScope){
   
   
    
    // apiHandler.getAdminPage(function(result){
    //     if(result.status===200){
    //         $scope.btnText="Create";
    //         console.log(result);
    //         $scope.superAdminId=result.data.user._id;
    //     }else{
           
    //         $location.path('login')
            
    //     }
    // });
    $scope.isAccess=false;

    $rootScope.$on('passData',function(err,data){
        console.log(data);
        $scope.btnText="Create";
        $scope.superAdminId=data._id;
        $scope.isAccess=true;
    });
    // $scope.reloadParentState = function() {
    //     $state.go('parent', {}, { reload: true });
    //   };

    // $rootScope.parentState=($state.current.name==="superAdmin")?true:false;
    // console.log($state.current.name)

    $scope.createBrand=function($event){
        $event.preventDefault();
        $scope.btnText="creating...";
        console.log($scope.brand);
        adminApi.createBrand($scope.brand,function(err,result){
            console.log("result",result);
            if(result){
                $scope.btnText="created";
                
            }
            
        })
    }
}])