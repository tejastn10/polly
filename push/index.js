const http = require("http");
const WebSocket = require("ws");

const port = process.env.PORT || 8080;

let connections = [];

const server = http.createServer();
const webSocketServer = new WebSocket.Server({ server });

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

webSocketServer.on("connection", (connection, request) => {
  console.log("New WebSocket connection established.");

  // Accessing the remote port from the request's socket
  const remotePort = request.socket.remotePort;
  console.log("New connection from port", remotePort);

  // Inform all connected clients about the new connection
  connections.forEach((c) =>
    c.send(`User ${remotePort} established a new connection`)
  );

  // Add the new connection to the connections array
  connections.push(connection);

  // Handle incoming messages
  connection.on("message", (msg) => {
    // Determine if the message is a string or a Buffer
    const message = typeof msg === "string" ? msg : msg.toString();

    // Broadcast the message to all connected clients
    connections.forEach((c) => c.send(`User ${remotePort}: ${message}`));
  });

  // Handle connection closure
  connection.on("close", () => {
    console.log(`Connection from port ${remotePort} closed`);
    // Remove the connection from the connections array
    connections = connections.filter((c) => c !== connection);
    // Optionally inform other clients about the disconnection
    connections.forEach((c) => c.send(`User ${remotePort} has disconnected`));
  });

  // Handle any errors that occur on the connection
  connection.on("error", (error) => {
    console.error("An error occurred on the WebSocket connection:", error);
  });
});

// Optional: Simple client example
/*
const ws = new WebSocket("ws://localhost:8080");
ws.onmessage = (msg) => console.log(`${msg.data}`);
ws.onopen = () => ws.send("Hello Server!");
*/
