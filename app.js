import express from "express";
import path from "path";
import morgan from "morgan";
import indexRouter from "./routes";
import userRouter from "./routes/user";
import ForumRouter from "./routes/forum";

const PORT = 4000;

const app = express();

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = morgan("dev");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/forum", ForumRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const handleListening = () => {
  console.log(`Server listening on http://127.0.0.1:${PORT} ✅`);
};

app.listen(PORT, "127.0.0.1", handleListening);
