///<reference path="../module/module.js"/>

app.service("socketService", function () {
  var obj = {};
  obj.socketConnect = function () {
    obj.socket = io("http://localhost:5000");
  };

  return obj;
});
