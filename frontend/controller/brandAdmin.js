///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminController", [
  "$scope",
  "$state",
  "$location",
  "apiHandler",
  function ($scope, $state, $location, apiHandler) {
    apiHandler.getBrandAdminPage(function (result) {
      if (result && result.status === 200) {
        $scope.brandName = result.data.name;
        $scope.brandId = result.data._id;
        $scope.brandAdminId = result.data.brandAdminId;
        $scope.brandLogo = result.data.logo;
      } else {
        $location.path("login");
      }
    });
    $scope.btnText = "Create Outlet";
    $scope.createOutlet = function ($event) {
      $event.preventDefault();
      apiHandler.createOutlet($scope.outlet, $scope.brandId, function (result) {
        console.log(result);
      });
    };

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
