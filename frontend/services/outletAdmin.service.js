///<reference path="../module/module.js"/>

app.service("outletAdminService", function (outletApi, $stateParams) {
  this.getSuperCategories = function (id, cb) {
    outletApi.getSuperCategories(id, cb);
  };

  this.getSubCategory = function (id, cb) {
    outletApi.getSubCategory(id, cb);
  };
});
