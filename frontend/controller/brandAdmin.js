///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminController", [
  "$scope",
  "$state",
  "$location",
  "brandApi",
  "$rootScope",
  function ($scope, $state, $location, brandApi, $rootScope) {
    brandApi.getBrandAdminPage();

    // function (result) {
    //   // console.log(result);
    //   if (result && result.status === 200) {
    //     $scope.brandName = result.data.name;
    //     $scope.brandId = result.data._id;
    //     $scope.brandAdminId = result.data.brandAdminId;
    //     $scope.brandLogo = result.data.logo;
    //   } else {
    //     $location.path("login");
    //   }
    // }
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.brandName = result.data.data.name;
        $scope.brandId = result.data.data._id;
        $scope.brandAdminId = result.data.data.brandAdminId;
        $scope.brandLogo = result.data.data.logo;
      }
    });
    $rootScope.$on("notEligible", function (err, data) {
      console.log(data);
      $location.path("login");
    });
    // $scope.btnText = "Create Outlet";
    // $scope.createOutlet = function ($event) {
    //   $event.preventDefault();
    //   apiHandler.createOutlet($scope.outlet, $scope.brandId, function (result) {
    //     console.log(result);
    //   });
    // };

    $scope.logOutHandler = function () {
      window.localStorage.removeItem("Authorization");
      $state.go("login");
    };

    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".bx-menu");

    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });
  },
]);
