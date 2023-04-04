///<reference path="../module/module.js"/>

app.factory(
  "brandAdminFactory",
  function (brandApi, $stateParams, $timeout, brandAdminDashBoardApi) {
    var obj = {};
    var timeout1 = null;
    var timeout2 = null;
    obj.debouncing = function (searchUser, id, cb) {
      if (timeout1) {
        $timeout.cancel(timeout1);
      }
      timeout1 = $timeout(function () {
        if (searchUser) brandApi.searchUserBySearchText(searchUser, id, cb);
      }, 800);
    };

    obj.outletDebouncing = function (object, cb) {
      if (timeout2) {
        $timeout.cancel(timeout2);
      }
      timeout2 = $timeout(function () {
        brandApi.searchOutletBySearchText(
          object.searchOutlet,
          object.brand._id,
          cb
        );
      }, 800);
    };

    obj.getOutlets = function (filter, limit, page, cb) {
      adminApi.getOutlets(filter, limit, page, cb);
    };

    obj.getPages = function (totalCount, limit) {
      var totalPage = Math.ceil(totalCount / limit);
      var pages = new Array(totalPage).fill(0);

      return pages;
    };

    obj.addSuperCategory = function (superCategory, brand, cb) {
      var formData = new FormData();
      formData.append("name", superCategory.name);
      formData.append("file", superCategory.logo);
      formData.append("brandName", brand.name);
      formData.append("brandId", brand._id);

      brandApi.addSuperCategory(formData, function (err, result) {
        if (result) {
          cb(null, result);
        } else {
          cb(err, null);
        }
      });
    };

    obj.updateSuperCategory = function (superCategory, brand, cb) {
      var formData = new FormData();

      formData.append("name", superCategory.name);
      formData.append("file", superCategory.logo);
      formData.append("_id", superCategory._id);
      formData.append("brandId", brand._id);

      brandApi.updateSuperCategory(formData, function (err, result) {
        if (result) {
          cb(null, result);
        } else {
          cb(err, null);
        }
      });
    };

    obj.updateProduct = function (updatedProduct, cb) {
      var updatedFormData = new FormData();
      updatedFormData.append("name", updatedProduct.name);
      updatedFormData.append("file", updatedProduct.image);
      updatedFormData.append("price", updatedProduct.price);
      updatedFormData.append("description", updatedProduct.description);
      updatedFormData.append("_id", updatedProduct._id);

      brandApi.updateProduct(updatedFormData, cb);
    };

    obj.addProduct = function (product, cb) {
      var formData = new FormData();

      formData.append("name", product.productName);
      formData.append("file", product.image);
      formData.append("categoryId", $stateParams.id);
      formData.append("categoryName", $stateParams.name);
      formData.append("price", product.price);
      formData.append("description", product.description);

      brandApi.addProduct(formData, cb);
    };
    obj.getPages = function (totalCount, limit) {
      var totalPage = Math.ceil(totalCount / limit);
      var pages = new Array(totalPage).fill(0);

      return pages;
    };
    obj.getProductsInBrand = function (cb) {
      brandApi.getProductsInBrand(
        {
          categoryId: $stateParams.id,
        },
        cb
      );
    };
    obj.getIndxById = function (arrayField, id) {
      return arrayField.findIndex(function (value) {
        return value._id === id;
      });
    };

    var monthDetails = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    obj.getGraphData = function (month, data) {
      var dates = [0];
      var activity = [0];
      for (var i = 1; i <= monthDetails[month]; i++) {
        dates.push(i);

        activity.push(0);
      }
      if (data) {
        data.forEach(function (value) {
          var date = +value._id.substr(0, 2);
          activity[date] = value.totalRevenue;
        });
      }
      return {
        dates,
        activity,
      };
    };

    var monthDetails = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    obj.getActivityData = function (month, data) {
      var dates = [];
      var activity = [""];
      for (var i = 1; i <= monthDetails[month]; i++) {
        dates.push(i);
        var str = "0 orders booked on " + i;
        activity.push(str);
      }
      if (data) {
        data.forEach(function (value) {
          var date = +value._id.substr(0, 2);
          activity[date] = value.count + " orders booked on " + date;
        });
      }
      return {
        dates,
        activity,
      };
    };

    obj.getOrderAnalysis = function (data) {
      var orderAnalysis = {
        totalOrders: 0,
        successRate: 0,
        cancellationRate: 0,
      };

      if (data.length === 2) {
        orderAnalysis.totalOrders = data[0].count + data[1].count;
        orderAnalysis.successRate =
          (data[0].count / orderAnalysis.totalOrders) * 100;
        orderAnalysis.cancellationRate =
          (data[1].count / orderAnalysis.totalOrders) * 100;
      } else if (data.length == 1) {
        if (data[0]._id === "completed") {
          orderAnalysis.totalOrders = data[0].count;
          orderAnalysis.successRate =
            (data[0].count / orderAnalysis.totalOrders) * 100;
        } else {
          orderAnalysis.totalOrders = data[0].count;
          orderAnalysis.cancellationRate =
            (data[0].count / orderAnalysis.totalOrders) * 100;
        }
      }

      return orderAnalysis;
    };

    obj.getBasicData = function (result, cb) {
      var brand = result.data.data;
      var currentYear = new Date().getFullYear();
      var one = 1;
      var months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var myChart1 = null;
      var myChart2 = null;

      brandAdminDashBoardApi.getBasicData(brand._id, function (err, result) {
        if (result) {
          var data = result.data;
          console.log(data);
          var outlets = [];
          var totalRevenue = 0;
          var totalOutlets = 0;
          var totalEmployees = 0;
          if (data[0].length) {
            outlets = data[0][0].names;
            totalOutlets = data[0][0].count;
          }

          if (data[1].length) totalEmployees = data[1][0].count;
          if (data[2].length) totalRevenue = data[2][0].totalRevenue;
          var topTenCategories = data[3];
          var topTenProducts = data[4];
          var brandGraphData = data[5];
          var topOutlet = data[7][0];
          var bottomOutlet = data[6][0];

          var month = new Date().getMonth();
          var activity = obj.getGraphData(month, brandGraphData);

          var brandDates = activity.dates;
          var brandRevenue = activity.activity;

          var activity = obj.getActivityData(month, data[8]);
          console.log(activity);
          var orderDates = activity.dates;
          var orderCnts = activity.activity;

          cb(null, {
            brand,
            one,
            myChart1,
            myChart2,
            months,
            month,
            outlets,
            totalEmployees,
            currentYear,
            totalOutlets,
            totalRevenue,
            topTenCategories,
            topTenProducts,
            topOutlet,
            bottomOutlet,
            brandDates,
            brandRevenue,
            orderDates,
            orderCnts,
          });
        } else {
          cb(err, null);
        }
      });
    };

    obj.addCategory = function (category, brand, cb) {
      var formData = new FormData();
      formData.append("name", category.name);
      formData.append("file", category.logo);
      formData.append("superCategoryName", $stateParams.name);
      formData.append("superCategoryId", $stateParams.id);
      formData.append("brandName", brand.name);
      formData.append("brandId", brand._id);

      brandApi.addCategory(formData, cb);
    };

    obj.updateCategory = function (category, brand, cb) {
      var formData = new FormData();

      formData.append("name", category.name);
      formData.append("file", category.logo);
      formData.append("_id", category._id);
      formData.append("brandId", brand._id);
      brandApi.updateCategory(formData, cb);
    };
    return obj;
  }
);
