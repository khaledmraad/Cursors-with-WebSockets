var server = require("ws").Server;

var s = new server({ port: 8888 });

s.on("connection", function (ws) {
  ws.on("message", function (message) {
    console.log("received " + message);

    //message broadcast
    s.clients.forEach(function e(client) {
      if (client != ws) {
        client.send(message.toString());
      }
    });

    //ws.send(message.toString());
  });

  ws.on("close", function () {
    console.log("press F5 for respect");
  });

  console.log("nvm his back");
});
