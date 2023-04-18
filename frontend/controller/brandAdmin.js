///<reference path="../module/module.js"/>

app.controller("brandAdminController", [
  "$scope",
  "$state",
  "$location",
  "brandApi",
  "$rootScope",
  function ($scope, $state, $location, brandApi, $rootScope) {
    $scope.object = {
      brand: null,
    };

    brandApi.getBrandAdminPage();

    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.object.brand = result.data.data;
      }
    });
    $rootScope.$on("notEligible", function (err, data) {
      $location.path("login");
    });

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
