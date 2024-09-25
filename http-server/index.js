const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const logs = `${Date.now()}: ${req.url} -- New Request received!! \n`;

  fs.appendFile("logs.txt", logs, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }

    switch (req.url) {
      case "/":
        console.log("Home Page");
        res.end("Welcome to the Home Page");
        break;
      case "/about":
        console.log("About Page");
        res.end("Welcome to the About Page");
        break;
      default:
        console.log("404, Page not found!!");
        res.end("404, Page Not Found");
        break;
    }
  });
});

myServer.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
