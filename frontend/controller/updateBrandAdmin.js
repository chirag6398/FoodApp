///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("updatebrandadminController",["$scope","$http","$location","apiHandler","$stateParams",function($scope,$http,$location,apiHandler,$stateParams){
    console.log($stateParams.id);//user id

    apiHandler.getUserById($stateParams.id,function(response){
        console.log(response);

        $scope.btnText="update"
        if(response.status==200){

        $scope.admin={
            userName:response.data.userName,
            firstName:response.data.firstName,
            lastName:response.data.lastName,
            email:response.data.email,
            number:response.data.number,

        }
    }else{
        $location.path("login")
    }

    });

    $scope.updateBrandAdmin=function($event){
        $event.preventDefault();
        console.log($scope.admin);
        apiHandler.updateAdmin($scope.admin,$stateParams.id,function(result){
            if(result.status==200){
                alert("update successfully")
            }
        })
    }

}])