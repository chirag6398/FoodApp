///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("brandAdminHomeController", [
  "$scope",
  "$rootScope",
  "$location",
  "brandApi",
  "brandAdminFactory",
  "toastNotifications",
  function (
    $scope,
    $rootScope,
    $location,
    brandApi,
    brandAdminFactory,
    toastNotifications
  ) {
    $scope.object = {
      brand: null,
      outlets: null,
      btnText: "create outlet",
      btnText0: "create",
      admin: {},
      updateOutletData: {},
      outlet: {},
      limit: 5,
      page: 1,
      totalPage: 0,
      one: 1,
      searchOutlet: "",
      searchTextResult: [],
    };
    brandApi.getBrandAdminPage();
    $scope.isLoading = true;
    $rootScope.$on("passData", function (err, result) {
      if (result) {
        $scope.object.brand = result.data.data;

        brandApi.getOutletsByBrandId(
          $scope.object.brand._id,
          $scope.object.limit,
          $scope.object.page,
          function (err, result) {
            $scope.isLoading = false;
            console.log(result);
            if (result) {
              $scope.object.outlets = result.data;
              $scope.object.totalPage = Math.ceil(
                result.count / $scope.object.limit
              );
              $scope.object.pages = brandAdminFactory.getPages(
                result.count,
                $scope.object.limit
              );
            } else {
              toastNotifications.error(
                "please visite later some issue has occured"
              );
            }
          }
        );
      }
    });

    $scope.searchTextHandler = function () {
      brandAdminFactory.outletDebouncing($scope.object, function (err, result) {
        if (result) {
          $scope.object.searchTextResult = result;
          if ($scope.object.searchTextResult.length == 0)
            $scope.object.searchTextResult = [{ name: "Not found" }];
        } else {
          $scope.object.searchTextResult = [];
        }
      });
    };

    $scope.setSearchResult = function (res) {
      $scope.object.outlets = [res];
      $scope.object.selectedOutlet = res;
      $scope.object.searchTextResult = [];
    };
    $scope.resetOutletData = function () {
      $scope.object.outlet = {};
    };
    $scope.createOutlet = function ($event) {
      $event.preventDefault();
      console.log($scope.object.outlet);
      brandApi.createOutlet(
        $scope.object.outlet,
        $scope.object.brand._id,
        $scope.object.brand.name,
        $scope.object.brand.logo,
        function (err, result) {
          if (result) {
            $scope.object.outlets.push(result.data);
            $("#exampleModal").modal("hide");
            toastNotifications.success("outlet created successfully");
          } else {
            console.log(err);
            toastNotifications.error(err.message);
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
          toastNotifications.success("updated successfully");
        } else {
          toastNotifications.error("updation failed");
        }
      });
    };

    $scope.setOutletData = function (outlet) {
      $scope.object.outlet = outlet;
      $scope.object.btnText0 = "Add Admin";
    };

    $scope.createOutletAdmin = function (
      $event,
      outletId,
      outletName,
      outletType
    ) {
      $event.preventDefault();
      $scope.object.btnText0 = "processing";
      console.log(outletId);
      brandApi.createOutletAdmin(
        $scope.object.admin,
        outletId,
        outletName,
        outletType,
        $scope.object.brand._id,
        $scope.object.brand.name,
        function (err, result) {
          if (result) {
            console.log(result);
            var indx = brandAdminFactory.getIndxById(
              $scope.object.outlets,
              outletId
            );
            if (indx !== -1) {
              $scope.object.outlets[indx].outletAdminId = result.data.adminId;
            }
            $scope.object.btnText0 = "successfull";
            $("#exampleModal1").modal("hide");
            toastNotifications.success("admin created");
          } else {
            $scope.object.btnText0 = "retry";
            console.log(err);
            toastNotifications.error(err.message);
          }
        }
      );
    };

    $scope.togleOutlet = function (outletId) {
      console.log(outletId);
      brandApi.togleOutlet(outletId, function (err, result) {
        if (result) {
          console.log(result);
          var indx = brandAdminFactory.getIndxById(
            $scope.object.outlets,
            outletId
          );
          $scope.object.outlets[indx].isActive =
            !$scope.object.outlets[indx].isActive;

          toastNotifications.success("outlet toggle succesfully");
        } else {
          toastNotifications.error("failed to togle try later");
        }
      });
    };

    $scope.deleteOutlet = function (outletId) {
      brandApi.deleteOutlet(outletId, function (err, result) {
        console.log(err, result);
        if (result) {
          toastNotifications.success("outlet deleted successfully");
          var indx = getIndxOfOutletById($scope.object.outlets, outletId);
          $scope.object.outlets[indx].isDeleted = true;
        } else {
          toastNotifications.error("failed try later");
        }
      });
    };

    $scope.getOutletHandler = function (page, limit) {
      $scope.object.isLoading = true;
      brandApi.getOutletsByBrandId(
        $scope.object.brand._id,
        limit,
        page,
        function (err, result) {
          console.log(result);
          if (result) {
            $scope.object.outlets = result.data;
            $scope.object.totalPage = Math.ceil(
              result.count / $scope.object.limit
            );
            $scope.object.pages = brandAdminFactory.getPages(
              result.count,
              $scope.object.limit
            );
            $scope.object.page = page;
          } else {
            toastNotifications.error(
              "please visite later some issue has occured"
            );
          }
        }
      );
    };
  },
]);
