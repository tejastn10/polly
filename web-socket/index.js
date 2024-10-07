const http = require("http");
const WebSocket = require("ws");

// Set the port from the environment variable or fallback to the command-line argument or default to 8080
const port = process.env.PORT || process.argv[2] || 8080;

const server = http.createServer();
const webSocketServer = new WebSocket.Server({ server });

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

webSocketServer.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Hey, I received a message: ${message}`);
    ws.send(`Hey Client, I received your message: ${message} on ${port}`);
  });
});
