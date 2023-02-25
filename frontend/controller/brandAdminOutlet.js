///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// }]);

app.controller("brandAdminOutletsController", [
  "$scope",
  "$http",
  "$location",
  "apiHandler",
  function ($scope, $http, $location, apiHandler) {
    apiHandler.getBrandAdminPage(function (result) {
      if (result && result.status === 200) {
        $scope.brandName = result.data.brandName;

        apiHandler.getOutletsByBrandId(result.data._id, function (result) {
          // console.log(result.data._id);
          $scope.outlets = result.data;
          // $scope.id=result.data._id;
        });
      } else {
        $location.path("login");
      }
    });

    $scope.btnText = "Create";
    $scope.admin = {};
    $scope.updateOutletData = {};
    $scope.setOutletData = function (outletData) {
    //   console.log(outletData);
      $scope.updateOutletData = {
        ...outletData,
      };
    //   console.log("this is variable data", $scope.updateOutletData);
    };

    $scope.updateOutlet = function ($event) {
      $event.preventDefault();
    //   $scope.updateOutletData.outletName=$scope.newData.outletName;
    //   $scope.updateOutletData.outletPinCode=$scope.newData.outletPinCode;
      $scope.newData._id=$scope.updateOutletData._id
    //   console.log($scope.newData);
      apiHandler.updateOutletData($scope.newData,function(err,result){
          if(result){
              console.log(result);
          }
      })
    };

    $scope.createOutletAdmin = function ($event, id) {
      $event.preventDefault();
    //   console.log($scope.admin, id);
      apiHandler.createOutletAdmin($scope.admin, id, function (result) {
        console.log(result);
      });
    };
  },
]);
