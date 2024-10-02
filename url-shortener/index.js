const express = require("express");
const dotenv = require("dotenv");
const urlRoute = require("./routes/urlRoutes");
const { connectToMongoDB } = require("./connection");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
connectToMongoDB(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
