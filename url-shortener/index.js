const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectToMongoDB } = require("./connection");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
connectToMongoDB(process.env.MONGO_URI);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const urlRoute = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/userRouter");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
