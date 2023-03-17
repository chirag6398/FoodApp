///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

function getIndxOfOutletById(outlets, id) {
  return outlets.findIndex(function (value) {
    return value._id === id;
  });
}
app.controller("brandAdminHomeController", [
  "$scope",
  "$rootScope",
  "$location",
  "brandApi",
  function ($scope, $rootScope, $location, brandApi) {
    brandApi.getBrandAdminPage();

    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.brandName = result.data.data.name;
        $scope.brandId = result.data.data._id;
        $scope.brandLogo = result.data.data.logo;
        brandApi.getOutletsByBrandId(
          result.data.data._id,
          function (err, result) {
            if (result) {
              console.log(result);
              $scope.object = { outlets: null };
              $scope.object.outlets = result.data;
            }
          }
        );
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
            console.log(result);
            var indx = $scope.object.outlets.findIndex(function (value) {
              return value._id === outletId;
            });
            if (indx !== -1) {
              $scope.object.outlets[indx].outletAdminId = result.data.adminId;
            }
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
      brandApi.togleOutlet(outletId, function (err, result) {
        if (result) {
          console.log(result);
          var indx = getIndxOfOutletById($scope.object.outlets, outletId);
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
