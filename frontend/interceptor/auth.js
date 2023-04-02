///<reference path="../module/module.js"/>

app.factory("myInterceptor", function () {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      var token = localStorage.getItem("Authorization");
      config.headers["Authorization"] = token;
      config.headers["Accept"] = "application/json;odata=verbose";
      return config;
    },
  };
});
