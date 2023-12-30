var server = require("ws").Server;

var s = new server({ port: 8888 });

s.on("connection", function (ws) {
  ws.on("message", function (message) {
    console.log("received " + message);
    if (message == "hello") {
      ws.send("hello from the other side");
    }
  });
});
