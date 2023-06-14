import express from "express";
const indexRouter = express.Router();

const getHome = (req, res) => {
  try {
    return res.render("pages/index");
  } catch (e) {
    console.log(e);
  }
};

const getReport = (req, res) => {
  try {
    return res.render("pages/report");
  } catch (e) {
    console.log(e);
  }
};

const getUpload = (req, res) => {
  try {
    return res.render("pages/upload");
  } catch (e) {
    console.log(e);
  }
};

const getSignup = (req, res) => {
  try {
    return res.render("pages/signup");
  } catch (e) {
    console.log(e);
  }
};

indexRouter.get("/", getHome);
indexRouter.get("/report", getReport);
indexRouter.get("/upload", getUpload);
indexRouter.get("/signup", getSignup);

export default indexRouter;
