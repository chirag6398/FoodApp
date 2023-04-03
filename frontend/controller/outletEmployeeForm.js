///<reference path="../module/module.js"/>

app.controller("outletEmployeeFormController", [
  "$scope",
  "outletAdminFactory",
  "$location",
  "apiHandler",
  "outletApi",
  "$rootScope",
  "toastNotifications",
  function (
    $scope,
    outletAdminFactory,
    $location,
    apiHandler,
    outletApi,
    $rootScope,
    toastNotifications
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

        outletAdminFactory.getOutletAgentEmployees(
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

      outletAdminFactory.createOutletAgent(
        $scope.object.agent,
        $scope.object.outlet,
        function (err, result) {
          if (result) {
            console.log(result);
            $scope.object.agents.unshift(result.data.data);
            $scope.object.btnText = "create";
            $("#exampleModal").modal("hide");
            toastNotifications.success("created successfully");
          } else {
            toastNotifications.error(err.message);
          }
        }
      );
    };
  },
]);
