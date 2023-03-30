///<reference path="../module/module.js"/>

app.service("socketService", function () {
  var obj = {};
  obj.socketConnect = function () {
    obj.socket = io("http://localhost:5000");
  };

  //   obj.emit=function(eventName,data){
  //     obj.socket.emit(eventName,data);
  //   }

  return obj;
});
