///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("outletEmployeeFormController", [
  "$scope",
  "outletAdminService",
  "$location",
  "apiHandler",
  "outletApi",
  "$rootScope",
  function (
    $scope,
    outletAdminService,
    $location,
    apiHandler,
    outletApi,
    $rootScope
  ) {
    outletApi.getOutletAdminPage();
    $scope.object = {
      agents: [],
      outlet: null,
      btnText: "create agent",
      agent: {},
      isLoading: true,
    };

    $rootScope.$on("passData", function (err, data) {
      if (data) {
        $scope.object.outlet = data.data.outletData;

        outletAdminService.getOutletAgentEmployees(
          $scope.object.outlet._id,
          function (err, result) {
            $scope.object.isLoading = false;
            console.log(err, result);
            if (result) {
              $scope.object.agents = result.data;
            }
          }
        );
      }
    });

    $scope.createOutletAgent = function ($event) {
      $event.preventDefault();
      $scope.object.btnText = "creating...";

      outletAdminService.createOutletAgent(
        $scope.object.agent,
        $scope.object.outlet,
        function (err, result) {
          if (result) {
            console.log(result);
            $scope.object.btnText = "created";
            $("#exampleModal").modal("hide");
          }
        }
      );
    };
  },
]);
