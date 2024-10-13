const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Root route to test the server
app.get("/", (_req, res) => {
  res.send("Hello... Visit /stream for Server-Sent Events.");
});

// * Server-Sent Events (SSE) endpoint
app.get("/stream", (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send an initial event to confirm the connection
  res.write("data: Connected to the server...\n\n");

  // Start sending events periodically
  const intervalId = setInterval(() => {
    res.write(`data: Data from server -- ${new Date().toISOString()}\n\n`);
  }, 1000);

  // Handle connection close event (client disconnects)
  req.on("close", () => {
    console.log("Client disconnected from stream");
    clearInterval(intervalId); // Stop sending events
    res.end();
  });
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

// Optional: Simple client example
/*
const sse = new EventSource("http://localhost:8080/stream");
sse.onmessage = (msg) => console.log(msg);
*/
