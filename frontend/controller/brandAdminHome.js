///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminHomeController", [
  "$scope",
  "$http",
  "$location",
  "brandApi",
  function ($scope, $http, $location, brandApi) {
    brandApi.getBrandAdminPage(function (err, result) {
      if (result) {
        $scope.brandName = result.data.name;
        $scope.brandId = result.data._id;
        $scope.brandLogo = result.data.logo;
        brandApi.getOutletsByBrandId(result.data._id, function (err, result) {
          if (result) {
            console.log(result);
            $scope.object = { outlets: [] };
            $scope.object.outlets = result.data;
          }
        });
      } else {
        $location.path("login");
      }
    });
    $scope.btnText = "Create Outlet";
    $scope.createOutlet = function ($event) {
      $event.preventDefault();
      brandApi.createOutlet(
        $scope.outlet,
        $scope.brandId,
        $scope.brandName,
        $scope.brandLogo,
        function (err, result) {
          if (result) {
            console.log(result);
            $scope.object.outlets.push(result.data);
            $("#exampleModal").modal("hide");
          } else {
            console.log(err);
          }
        }
      );
    };

    $scope.btnText0 = "Create";
    $scope.admin = {};
    $scope.updateOutletData = {};

    $scope.updateOutlet = function ($event, outlet) {
      $event.preventDefault();

      brandApi.updateOutletData(outlet, function (err, result) {
        if (result) {
          console.log(result);
          $("#exampleModal10").modal("hide");
        }
      });
    };

    $scope.createOutletAdmin = function (
      $event,
      outletId,
      outletName,
      outlateLocation,
      outletType
    ) {
      $event.preventDefault();
      $scope.btnText0 = "processing";
      brandApi.createOutletAdmin(
        $scope.admin,
        outletId,
        outletName,
        outlateLocation,
        outletType,
        $scope.brandId,
        $scope.brandName,
        function (err, result) {
          if (result) {
            $scope.btnText0 = "successfull";
            $("#exampleModal1").modal("hide");
          } else {
            $scope.btnText0 = "failed";
            console.log(err);
          }
        }
      );
    };

    $scope.togleOutlet = function (outletId) {
      console.log(outletId);
      apiHandler.togleOutlet(outletId, function (err, result) {
        if (result) {
          console.log(result);
        }
      });
    };
  },
]);
