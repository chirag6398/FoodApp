///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminHomeController", [
  "$scope",
  "$rootScope",
  "$location",
  "brandApi",
  "brandAdminService",
  function ($scope, $rootScope, $location, brandApi, brandAdminService) {
    $scope.object = {
      brand: null,
      outlets: null,
      btnText: "create outlet",
      btnText0: "create",
      admin: {},
      updateOutletData: {},
      outlet: {},
    };
    brandApi.getBrandAdminPage();

    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.object.brand = result.data.data;

        brandApi.getOutletsByBrandId(
          $scope.object.brand._id,
          function (err, result) {
            if (result) {
              $scope.object.outlets = result.data;
            }
          }
        );
      }
    });

    $scope.createOutlet = function ($event) {
      $event.preventDefault();
      brandApi.createOutlet(
        $scope.object.outlet,
        $scope.object.brand._id,
        $scope.object.brand.name,
        $scope.object.brand.logo,
        function (err, result) {
          if (result) {
            $scope.object.outlets.push(result.data);
            $("#exampleModal").modal("hide");
          } else {
            console.log(err);
          }
        }
      );
    };

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
      // outlateLocation,
      outletType
    ) {
      $event.preventDefault();
      $scope.object.btnText0 = "processing";

      brandApi.createOutletAdmin(
        $scope.object.admin,
        outletId,
        outletName,
        // outlateLocation,
        outletType,
        $scope.object.brand._id,
        $scope.object.brand.name,
        function (err, result) {
          if (result) {
            console.log(result);
            var indx = brandAdminService.getIndxById(
              $scope.object.outlets,
              outletId
            );
            if (indx !== -1) {
              $scope.object.outlets[indx].outletAdminId = result.data.adminId;
            }
            $scope.object.btnText0 = "successfull";
            $("#exampleModal1").modal("hide");
          } else {
            $scope.object.btnText0 = "failed";
            console.log(err);
          }
        }
      );
    };

    $scope.togleOutlet = function (outletId) {
      console.log(outletId);
      brandApi.togleOutlet(outletId, function (err, result) {
        if (result) {
          console.log(result);
          var indx = brandAdminService.getIndxById(
            $scope.object.outlets,
            outletId
          );
          $scope.object.outlets[indx].isActive =
            !$scope.object.outlets[indx].isActive;

          alert("outlet toggle succesfully");
        }
      });
    };

    $scope.deleteOutlet = function (outletId) {
      brandApi.deleteOutlet(outletId, function (err, result) {
        console.log(err, result);
        if (result) {
          alert("outlet deleted successfully");
          var indx = getIndxOfOutletById($scope.object.outlets, outletId);
          $scope.object.outlets[indx].isDeleted = true;
        }
      });
    };
  },
]);
