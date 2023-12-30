var server = require("ws").Server;

var s = new server({ port: 8888 });

s.on("connection", function (ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message);

    if (message.type == "name") {
      ws.personName = message.data;
      return;
    }

    console.log("received " + message);

    //message broadcast
    s.clients.forEach(function e(client) {
      if (client != ws) {
        client.send(
          JSON.stringify({
            name: ws.personName,
            data: message.data,
          }),
        );
      }
    });

    //ws.send(message.toString());
  });

  ws.on("close", function () {
    console.log("press F for respect");
  });

  console.log("nvm his back");
});
