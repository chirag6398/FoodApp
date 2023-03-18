///<reference path="../module/module.js"/>

app.service("brandAdminService", function (brandApi) {
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
});
