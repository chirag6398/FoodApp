///<reference path="../module/module.js"/>

app.controller("outletAgentProfileController", [
  "$scope",
  "$location",
  "adminApi",
  "toastNotifications",
  "outletAgentService",
  function (
    $scope,
    $location,
    adminApi,
    toastNotifications,
    outletAgentService
  ) {
    $scope.isLoading = true;

    outletAgentService.getOutletAgentPage(function (err, result) {
      $scope.isLoading = false;
      if (result) {
        console.log(result);
        $scope.agent = result.data.agent;
        $scope.brand = result.data.outlet.brand;
      } else {
        $location.path("login");
      }
    });

    $scope.setFormData = function (agent) {
      $scope.updateAgent = { ...agent };
    };

    $scope.updateUserName = function () {
      adminApi.updateUserName(
        $scope.updateAgent.userName,
        $scope.agent._id,
        function (err, result) {
          if (result) {
            $scope.agent.userName = $scope.updateAgent.userName;
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error(err.message);
          }
          $("#exampleModal1").modal("hide");
        }
      );
    };

    $scope.updateEmail = function () {
      adminApi.updateEmail(
        $scope.updateAgent.email,
        $scope.agent._id,
        function (err, result) {
          if (result) {
            $scope.agent.email = $scope.updateAgent.email;
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error(err.message);
          }
          $("#exampleModal2").modal("hide");
        }
      );
    };

    $scope.updatePhoneNumber = function () {
      adminApi.updatePhoneNumber(
        $scope.updateAgent.number,
        $scope.agent._id,
        function (err, result) {
          if (result) {
            $scope.agent.number = $scope.updateAgent.number;
            toastNotifications.success("updated successfully");
          } else {
            toastNotifications.error(err.message);
          }
          $("#exampleModal3").modal("hide");
        }
      );
    };

    $scope.changePassword = function () {
      adminApi.updatePassword(
        $scope.updateAgent,
        $scope.agent._id,
        function (err, result) {
          console.log(result);
          if (result) {
            toastNotifications.success("Password Changed");
          } else {
            toastNotifications.error("please try later");
          }
          $("#exampleModal4").modal("hide");
        }
      );
    };
  },
]);
