import express from "express";
const indexRouter = express.Router();

const getHome = (req, res) => {
  try {
    return res.render("index/index");
  } catch (e) {
    console.log(e);
  }
};

const getReport = (req, res) => {
  try {
    return res.render("index/report");
  } catch (e) {
    console.log(e);
  }
};

const getUpload = (req, res) => {
  try {
    return res.render("index/upload");
  } catch (e) {
    console.log(e);
  }
};

const getSignup = (req, res) => {
  try {
    return res.render("index/signup");
  } catch (e) {
    console.log(e);
  }
};

indexRouter.get("/", getHome);
indexRouter.get("/report", getReport);
indexRouter.get("/upload", getUpload);
indexRouter.get("/signup", getSignup);

export default indexRouter;
