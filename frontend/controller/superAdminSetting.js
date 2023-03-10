///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminSettingController", [
  "$scope",
  "$http",
  "$location",
  "adminApi",
  "$stateParams",
  "$rootScope",
  function ($scope, $http, $location, adminApi, $stateParams, $rootScope) {
    // adminApi.getAdminPage(function(err,result){
    //     if(result){
    //         $scope.btnText="Create";
    //         // console.log(result);
    //         $scope.admin=result.data.user;
    //         console.log($scope.admin)
    //         $scope.superAdminId=result.data.user._id;
    //     }else{

    //         $location.path('login')

    //     }
    // });
    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      $scope.btnText = "Create";
      $scope.admin = data;
      console.log($scope.admin);
      $scope.superAdminId = data._id;
    });

    $scope.btnText1 = "update";
    $scope.updateAdmin = function ($event, adminId) {
      $event.preventDefault();
      adminApi.updateAdmin($scope.admin, adminId, function (err, result) {
        console.log(result);
        if (result) $scope.btnText1 = "updated successfully";
      });
    };
    $scope.changePassword = function ($event, adminId) {
      $event.preventDefault();
      adminApi.updatePassword($scope.admin, adminId, function (err, result) {
        console.log(result);
        $scope.btnText1 = "updated successfully";
      });
    };
    $scope.adminId = $stateParams.id;
  },
]);
