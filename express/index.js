const express = require("express");
const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Hello from Home Page");
});

app.get("/about", (req, res) => {
  const name = req.query.name || "Guest";
  res.send(`Hello ${name}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
