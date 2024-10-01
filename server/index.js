const express = require("express");
const os = require("os");

const app = express();
const hostname = os.hostname();
const port = 8080;

// ? Start server
app.listen(port, () => {
  console.log(`Polly Server is listening on port: ${port} & host: ${hostname}`);
});

// * Route for the root path
app.get("/", (_req, res) => {
  console.log(`Hello from ${hostname}`);
  res.send(`Hello from ${hostname}`);
});
