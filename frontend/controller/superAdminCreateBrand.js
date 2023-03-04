///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>

app.controller("superAdminCreateBrandController", [
  "$scope",
  "$http",
  "$location",
  "adminApi",
  "apiHandler",
  "$state",
  "$rootScope",
  function (
    $scope,
    $http,
    $location,
    adminApi,
    apiHandler,
    $state,
    $rootScope
  ) {
    $scope.isAccess = false;
    adminApi.getAdminPage();
    $rootScope.$on("passData", function (err, data) {
      console.log(data);
      $scope.btnText = "Create";
      $scope.superAdminId = data._id;
      $scope.isAccess = true;
    });

    $scope.btnText = "Add Admin";

    adminApi.getBrands(function (err, result) {
      if (result) {
        $scope.brands = result.data;
        console.log($scope.brands);
      }
    });

    $scope.admin = {};

    $scope.createBrandAdmin = function ($event, brandId, brandName) {
      $event.preventDefault();
      $scope.btnText = "processing";

      console.log($scope.admin);

      adminApi.postAddBrandAdmin(
        $scope.admin,
        brandId,
        brandName,
        function (err, result) {
          if (result) {
            console.log(result);
            $scope.btnText = "successful";
          }
        }
      );
    };

    $scope.deactivateBrand = function (brandId) {
      console.log(brandId);
      apiHandler.deactivateBrand(brandId, function (result) {
        console.log(result);
      });
    };

    $scope.activateBrand = function (brandId) {
      console.log(brandId);
      apiHandler.activateBrand(brandId, function (result) {
        console.log(result);
      });
    };
    $scope.setData = function (brand) {
      console.log(brand);
      $scope.data = {
        name: brand.name,
        email: brand.contactInfo.email,
        number: brand.contactInfo.number,
        city: brand.location.city,
        pinCode: brand.location.pinCode,
        address: brand.location.address,
        description: brand.description,
        _id: brand._id,
      };
    };

    $scope.editBrand = function ($event) {
      $event.preventDefault();
      console.log($scope.data);
      var formData = new FormData();

      formData.append("name", $scope.data.name);
      formData.append("file", $scope.data.logo);
      formData.append("_id", $scope.data._id);
      formData.append("number", $scope.data.number);
      formData.append("email", $scope.data.email);
      formData.append("address", $scope.data.address);
      formData.append("city", $scope.data.city);
      formData.append("description", $scope.data.description);
      formData.append("pinCode", $scope.data.pinCode);

      $http
        .post("http://localhost:5000/api/superAdmin/updateBrand", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then(
          function (response) {
            console.log(response.data);
          },
          function (error) {
            console.log(error);
          }
        );
    };

    $scope.deleteBrand = function (brandId) {
      apiHandler.deleteBrand(brandId, function (err, result) {
        if (result) {
          console.log(result);
        }
      });
    };

    $scope.createBrand = function ($event) {
      $event.preventDefault();
      $scope.btnText = "creating...";
      console.log($scope.brand);

      var brandData = new FormData();

      brandData.append("name", $scope.brand.name);
      brandData.append("file", $scope.brand.logo);
      brandData.append("number", $scope.brand.number);
      brandData.append("email", $scope.brand.email);
      brandData.append("address", $scope.brand.address);
      brandData.append("city", $scope.brand.city);
      brandData.append("description", $scope.brand.description);
      brandData.append("pinCode", $scope.brand.pinCode);

      // console.log(brandData);
      // for(var value of brandData.values()){
      //     console.log(value);
      // }

      //   $http({
      //     method: "POST",
      //     url: "http://localhost:5000/api/superAdmin/createBrand",
      //     data: $scope.brand,
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       "Content-Type": undefined,
      //     },
      //   }).then(function (response) {
      //     console.log(response);
      //     // cb(null,response);
      //   }),
      //     function (err) {
      //       // cb(err,null);
      //       console.log(err);
      //     };

      adminApi.createBrand(brandData, function (err, result) {
        console.log("result", result);
        $scope.brands.push(result.data);
        console.log($scope.brands);
        if (result) {
          $scope.btnText = "created";
        }
      });
    };
  },
]);
