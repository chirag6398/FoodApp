// ///<reference path="../module/module.js"/>
// ///<reference path="../factory/apicall.js"/>

// // app.config(['$httpProvider', function($httpProvider) {
// //     $httpProvider.defaults.headers.common['Authorization'] = (window.localStorage.getItem("Authorization"));
// // }]);

// app.controller("brandAdminOutletsController", [
//   "$scope",
//   "$http",
//   "$location",
//   "apiHandler",
//   "brandApi",
//   function ($scope, $http, $location, apiHandler,brandApi) {

//     brandApi.getBrandAdminPage(function (result) {
//       if (result && result.status === 200) {
//         $scope.brandName = result.data.name;
//         $scope.brandId=result.data._id;

//         brandApi.getOutletsByBrandId(result.data._id, function (err,result) {

//           if(result){
//             console.log(result);
//             $scope.outlets = result.data;

//           }

//         });
//       } else {
//         $location.path("login");
//       }
//     });

//     $scope.btnText = "Create";
//     $scope.admin = {};
//     $scope.updateOutletData = {};
//     $scope.setOutletData = function (outletData) {

//       $scope.updateOutletData = {
//         ...outletData,
//       };

//     };

//     $scope.updateOutlet = function ($event) {
//       $event.preventDefault();
//        $scope.newData._id=$scope.updateOutletData._id

//       apiHandler.updateOutletData($scope.newData,function(err,result){
//           if(result){
//               console.log(result);
//           }
//       })
//     };

//     $scope.createOutletAdmin = function ($event, id) {
//       $event.preventDefault();

//       apiHandler.createOutletAdmin($scope.admin, id,$scope.brandId, function (result) {
//         console.log(result);
//       });
//     };

//     $scope.togleOutlet=function(outletId){
//       console.log(outletId);
//       apiHandler.togleOutlet(outletId,function(err,result){
//         if(result){
//           console.log(result);

//         }
//       })
//     }
//   },
// ]);
