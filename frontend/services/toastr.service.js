///<reference path="../module/module.js"/>

app.service("toastNotifications", function () {
  this.setOptions = function () {
    toastr.options.positionClass = "toast-top-right";
    toastr.options.closeButton = true;
    toastr.options.showMethod = "slideDown";
    toastr.options.hideMethod = "slideUp";
    toastr.options.progressBar = true;
  };

  this.info = function (message) {
    toastr.info(message);
  };

  this.warning = function (message) {
    toastr.warning(message);
  };
  this.success = function (message) {
    toastr.success(message);
  };
  this.error = function (message) {
    toastr.error(message);
  };

  this.clear = function () {
    toastr.clear();
  };
});
