import express from "express";
import path from "path";
import morgan from "morgan";
import indexRouter from "./routes";
import userRouter from "./routes/user";
import ForumRouter from "./routes/forum";

console.log(process.env.NODE_ENV);
// 개발 환경인지 아닌지 확인
if (process.env.NODE_ENV === "production") {
  console.log("Production Mode");
} else if (process.env.NODE_ENV === ("development" | "undefined")) {
  console.log("Development Mode");
}
//

const PORT = 5000;

const app = express();

const createError = require("http-errors");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV === "production") {
  app.set("views", path.join(process.cwd(), "dist"));
  app.set("view engine", "ejs");
  app.engine("html", require("ejs").renderFile);
  app.use("/public", express.static(path.join(process.cwd(), "dist/assets")));
} else if (process.env.NODE_ENV === "development") {
  app.set("views", path.join(process.cwd(), "views"));
  app.set("view engine", "pug");
  app.use(morgan("dev"));
  app.use("/public", express.static(path.join(process.cwd(), "public")));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/forum", ForumRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

const handleListening = () => {
  console.log(`Server listening on http://127.0.0.1:${PORT} ✅`);
};

app.listen(PORT, "127.0.0.1", handleListening);

export default app;
