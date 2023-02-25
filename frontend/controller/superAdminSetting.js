///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>


app.controller("superAdminSettingController",["$scope","$http","$location","apiHandler","$stateParams","$rootScope",function($scope,$http,$location,apiHandler,$stateParams,$rootScope){
    if($rootScope.admin!==undefined){
        $scope.btnText="Create";
        // console.log(result);
        $scope.admin=$rootScope.admin;
        console.log($scope.admin)
        $scope.superAdminId=$rootScope.admin._id;
    }else{
        $location.path('login')
    }
    // apiHandler.getAdminPage(function(result){
    //     if(result.status===200){
    //         $scope.btnText="Create";
    //         // console.log(result);
    //         $scope.admin=result.data.user;
    //         console.log($scope.admin)
    //         $scope.superAdminId=result.data.user._id;
    //     }else{
           
    //         $location.path('login')
            
    //     }
    // });

    $scope.btnText1="update"
    $scope.updateAdmin=function($event,adminId){
        $event.preventDefault();
        apiHandler.updateAdmin($scope.admin,adminId,function(result){
            console.log(result);
            $scope.btnText1="updated successfully"

        })
    }
    $scope.changePassword=function($event,adminId){
        $event.preventDefault();
        apiHandler.updatePassword($scope.admin,adminId,function(err,result){
            console.log(result);
            $scope.btnText1="updated successfully"

        })
    }
    $scope.adminId=$stateParams.id;

}])