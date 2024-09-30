const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    const logMessage = `\n${new Date().toISOString()}: ${req.ip} ${
      req.method
    } ${req.path}\n`;

    // Append log to the file
    fs.appendFile(filename, logMessage, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
      next();
    });
  };
}

module.exports = {
  logReqRes,
};
