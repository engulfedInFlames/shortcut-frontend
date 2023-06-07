import express from "express";
const indexRouter = express.Router();

const getHome = (req, res) => {
  try {
    return res.render("index");
  } catch (e) {
    console.log(e);
  }
};

const getReport = (req, res) => {
  try {
    return res.render("report");
  } catch (e) {
    console.log(e);
  }
};

const getUpload = (req, res) => {
  try {
    return res.render("upload");
  } catch (e) {
    console.log(e);
  }
};

indexRouter.get("/", getHome);
indexRouter.get("/report", getReport);
indexRouter.get("/upload", getUpload);

export default indexRouter;
