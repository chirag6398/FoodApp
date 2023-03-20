///<reference path="../module/module.js"/>

app.service("superAdminService", function (adminApi, $timeout) {
  var timeout = null;
  this.debouncing = function (searchUser, cb) {
    if (timeout) {
      $timeout.cancel(timeout);
    }
    timeout = $timeout(function () {
      adminApi.searchUserBySearchText(searchUser, cb);
    }, 800);
  };

  this.getUsers = function (limit, page, cb) {
    adminApi.getUsers({ limit: limit, page: page }, cb);
  };

  this.getPages = function (totalCount, limit) {
    var totalPage = Math.ceil(totalCount / limit);
    var pages = new Array(totalPage).fill(0);

    return pages;
  };

  this.changeLogo = function (brandId, logo, cb) {
    var formData = new FormData();
    formData.append("_id", brandId);
    formData.append("file", logo);
    adminApi.changeLogo(formData, cb);
  };

  this.updateName = function (brandId, name, logo) {
    adminApi.updateBrandName({ _id: brandId, name: name }, cb);
  };
});
