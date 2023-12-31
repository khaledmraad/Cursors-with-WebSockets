var server = require("ws").Server;

var s = new server({ port: 8888 });

var client_meta_data = new Map();
s.on("connection", function (ws) {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  var all_data = {};
  var userName;
  ws.on("message", (messageString) => {
    messageString = JSON.parse(messageString);
    if (messageString.type == "name") {
      ws.personName = messageString.data;
      userName = messageString.data.toString() + "";
      //btw name should be unique
      all_data[messageString.data] = [randomColor, 0, 0];
      console.log(all_data);
      console.log("noise");

      s.clients.forEach(function e(client) {
        new_guy_data = {
          name: ws.personName,
          color: randomColor,
        };
        client.send(
          JSON.stringify({
            type: "onatha_one",
            data: new_guy_data,
          }),
        );
      });

      return;
    } else {
      var x, y;
      x = messageString.data[0];
      y = messageString.data[1];
      all_data[ws.personName][1] = x;
      all_data[ws.personName][2] = y;
      console.log(all_data);
    }

    //coordinates broadcast
    s.clients.forEach(function e(client) {
      client.send(
        JSON.stringify({
          type: "cord_change",
          data: all_data,
        }),
      );
    });
  });

  ws.on("close", function () {
    s.clients.forEach(function e(client) {
      client.send(
        JSON.stringify({
          type: "deleted",
          data: userName,
        }),
      );
    });

    console.log("press F for respect");
  });

  console.log("nvm his back");
});
