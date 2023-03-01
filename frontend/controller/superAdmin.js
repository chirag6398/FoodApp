///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminController",["$scope","$http","$location","apiHandler","$state","$rootScope",function($scope,$http,$location,apiHandler,$state,$rootScope){
    // apiHandler.getAdminPage();

    $rootScope.$on('passData',function(err,data){
        console.log(data);
    });

    $rootScope.$on('notEligible',function(err,isEligible){
        if(!isEligible){
            $location.path('login');
        }
    })
   
    // function(result){
    //     if(result.status===200){
    //         $scope.btnText="Create";
            
    //         $rootScope.superAdmin=result.data.user;
    //         $rootScope.user=result.data.user;
    //         $scope.superAdminId=result.data.user._id;
    //         // console.log("called");
    //         $rootScope.$broadcast('passData',$rootScope.user);

    //     }else{
    //         // $rootScope.$broadcast('notEligible',false);
    //         $location.path('login')
            
    //     }
    // }
    $scope.createBrand=function($event){
        $event.preventDefault();
        $scope.btnText="creating...";
        // console.log($scope.brand);
        apiHandler.createBrand($scope.brand,function(result){
            console.log("result",result);
            if(result.status===200){
                $scope.btnText="created";
                
            }
          
        })
    }
}])