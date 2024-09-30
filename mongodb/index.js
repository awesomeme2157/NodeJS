const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

const { connectMongoDB } = require("./connection");
connectMongoDB(process.env.MONGO_URI);

const userRouter = require("./routes/userRoutes");
const { logReqRes } = require("./middlewares/index");

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for logs
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

// Running PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
