///<reference path="../module/module.js"/>


app.controller("superAdminOutletsController",["$scope","$http","$location","adminApi","$rootScope",function($scope,$http,$location,adminApi,$rootScope){
   
    // adminApi.getAdminPage(function(err,result){
    //     if(result){
    //         $scope.btnText="Create";
    //         $scope.admin=result.data.user;
    //         console.log($scope.admin)
    //         $scope.superAdminId=result.data.user._id;
    //     }else{
           
    //         $location.path('login')
            
    //     }
    // });

    $rootScope.$on('passData',function(err,data){
        console.log(data);
        $scope.btnText="Create";
        $scope.admin=data;
        console.log($scope.admin)
        $scope.superAdminId=data._id;
    });

    adminApi.getOutlets(function(err,result){
        console.log(result,err)
        if(result){
            $scope.outlets=result.data;
        }
    })

  

}])