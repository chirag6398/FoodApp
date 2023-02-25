///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminCreateBrandController",["$scope","$http","$location","apiHandler","$state","$rootScope",function($scope,$http,$location,apiHandler,$state,$rootScope){
    
    if($rootScope.admin!==undefined){
        $scope.btnText="Create";
          
        $scope.superAdminId=$rootScope.admin._id;
    }else{
      
        $location.path('login')
       
    }

    // apiHandler.getAdminPage(function(result){
    //     if(result.status===200){
    //         $scope.btnText="Create";
    //         console.log(result);
    //         $scope.superAdminId=result.data.user._id;
    //     }else{
    //         // window.location.reload();
    //         $location.path('login')
    //         // console.log(result);
    //     }
    // });
    // $scope.reloadParentState = function() {
    //     $state.go('parent', {}, { reload: true });
    //   };

    // $rootScope.parentState=($state.current.name==="superAdmin")?true:false;
    // console.log($state.current.name)

    $scope.createBrand=function($event){
        $event.preventDefault();
        $scope.btnText="creating...";
        console.log($scope.brand);
        apiHandler.createBrand($scope.brand,function(result){
            console.log("result",result);
            if(result.status===200){
                $scope.btnText="created";
                
            }
            // console.log("error",error);
        })
    }
}])