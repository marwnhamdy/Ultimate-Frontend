var staticServer = require("static-server");
var server = new staticServer({
  rootPath: "./dist/",
  port: 8081,
});

server.start(function () {
  console.log("Server Started At Port ", server.port);
});
