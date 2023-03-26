///<reference path="../module/module.js"/>

app.service("brandAdminService", function (brandApi, $stateParams) {
  this.addSuperCategory = function (superCategory, brand, cb) {
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

  this.updateSuperCategory = function (superCategory, brand, cb) {
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

  this.updateProduct = function (updatedProduct, cb) {
    var updatedFormData = new FormData();
    updatedFormData.append("name", updatedProduct.name);
    updatedFormData.append("file", updatedProduct.image);
    updatedFormData.append("price", updatedProduct.price);
    updatedFormData.append("description", updatedProduct.description);
    updatedFormData.append("_id", updatedProduct._id);

    brandApi.updateProduct(updatedFormData, cb);
  };

  this.addProduct = function (product, cb) {
    var formData = new FormData();

    formData.append("name", product.productName);
    formData.append("file", product.image);
    formData.append("categoryId", $stateParams.id);
    formData.append("categoryName", $stateParams.name);
    formData.append("price", product.price);
    formData.append("description", product.description);

    brandApi.addProduct(formData, cb);
  };
  this.getPages = function (totalCount, limit) {
    var totalPage = Math.ceil(totalCount / limit);
    var pages = new Array(totalPage).fill(0);

    return pages;
  };
  this.getProductsInBrand = function (cb) {
    brandApi.getProductsInBrand(
      {
        categoryId: $stateParams.id,
      },
      cb
    );
  };
  this.getIndxById = function (arrayField, id) {
    return arrayField.findIndex(function (value) {
      return value._id === id;
    });
  };

  var monthDetails = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  this.getGraphData = function (month, data) {
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

  this.getOrderAnalysis = function (data) {
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
    }

    return orderAnalysis;
  };
});
