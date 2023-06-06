import express from "express";
const indexRouter = express.Router();

const getHome = (req, res) => {
  return res.render("index");
};

indexRouter.get("/", getHome);

export default indexRouter;
