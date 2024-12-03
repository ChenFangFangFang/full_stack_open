const config = require("./utils/config");
const express = require("express");

const app = express();
const cors = require("cors");
require("express-async-errors");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog_controller");
const usersRouter = require("./controllers/user_controller");
const loginRouter = require("./controllers/login_controller");
const commentRouter = require("./controllers/comment_controller");
mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to MongoDB:", error.message);
  });
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blog", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/comments", commentRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

console.log("Finished setting up routes");

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
