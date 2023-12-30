var server = require("ws").Server;

var s = new server({ port: 8888 });

var client_meta_data = new Map();
s.on("connection", function (ws) {
  var color = Math.floor(Math.random() * 360);

  var all_data = {};

  ws.on("message", (messageString) => {
    messageString = JSON.parse(messageString);
    if (messageString.type == "name") {
      ws.personName = messageString.data;
      //btw name should be unique
      all_data[messageString.data] = [color, 0, 0];
      return;
    } else {
      var x, y;
      console.log(messageString);
      x = messageString.data[0];
      y = messageString.data[1];
      all_data[ws.personName][1] = x;
      all_data[ws.personName][2] = y;
    }

    console.log(messageString);

    //coordinates broadcast
    s.clients.forEach(function e(client) {
      all_data[ws.personName] = messageString.data;

      client.send(JSON.stringify(all_data));
    });
  });

  ws.on("close", function () {
    console.log("press F for respect");
  });

  console.log("nvm his back");
});
