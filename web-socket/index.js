const http = require("http");
const WebSocket = require("ws");

// Set the port from the environment variable or fallback to the command-line argument or default to 8080
const port = process.env.PORT || process.argv[2] || 8080;

const server = http.createServer();
const webSocketServer = new WebSocket.Server({ server });

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

webSocketServer.on("connection", (connection) => {
  console.log("New WebSocket connection established.");

  // Listen for incoming messages from the connected client
  connection.on("message", (message) => {
    console.log(`Hey, I received a message: ${message}`);

    // Send a response back to the client acknowledging the message
    connection.send(
      `Hey Client, I received your message: "${message}" on port ${port}`
    );
  });

  // Handle connection closure by the client
  connection.on("close", () => {
    console.log("Client has disconnected.");
  });

  // Handle any errors that occur on the connection
  connection.on("error", (error) => {
    console.error("An error occurred on the WebSocket connection:", error);
  });
});
