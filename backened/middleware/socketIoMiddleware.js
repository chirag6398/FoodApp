var io = null;
module.exports = {
  init: function (server) {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    return io;
  },
  getIo: function () {
    if (io) {
      return io;
    }
  },
};
