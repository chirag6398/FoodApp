///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminController", [
  "$scope",
  "$location",
  "adminApi",
  "$state",
  "$rootScope",
  function ($scope, $location, adminApi, $state, $rootScope) {
    adminApi.getAdminPage();

    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      $scope.superAdmin = data;
    });

    $rootScope.$on("notEligible", function (err, isEligible) {
      if (!isEligible) {
        $location.path("login");
      }
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
